import xml from 'xml';
import { gql } from '@apollo/client';

const GET_PRODUCTS = gql`
    query GetProducts($pagination: PaginationInput!) {
        products(pagination: $pagination) {
            pageInfo {
                hasNextPage
                endCursor
            }
            edges {
                cursor
                node {
                    alias
                    createdAt
                }
            }
        }
    }
`;

const GET_ARTICLES = gql`
    query GetProducts($pagination: PaginationInput!) {
        articles(pagination: $pagination) {
            pageInfo {
                hasNextPage
                endCursor
            }
            edges {
                cursor
                node {
                    id
                    title
                    SEODescription
                    creator {
                        firstName
                        lastName
                    }
                    updatedAt
                    createdAt
                }
            }
        }
    }
`;

const GET_OTHER = gql`
    query GET_SITEMAP_INFO {
        categories {
            id
            alias
        }
        brands {
            id
            alias
        }
    }
`;

const url = (baseUrl, path) => `${baseUrl}${path}`;

const getProducts = async (
    apolloClient,
    baseUrl,
    result = [],
    cursor = null
) => {
    const response = await apolloClient.query({
        query: GET_PRODUCTS,
        variables: {
            pagination: { count: 100, after: cursor },
        },
    });

    const newResult = [
        ...result,
        ...response.data.products.edges.map((edge) => ({
            loc: url(baseUrl, `/p/${edge.node.alias}`),
            changefreq: 'weekly',
        })),
    ];

    if (response.data.products.pageInfo.hasNextPage) {
        return await getProducts(
            apolloClient,
            baseUrl,
            newResult,
            response.data.products.pageInfo.endCursor
        );
    }

    return newResult.reduce(
        (result, currentResult) => [...result, currentResult],
        []
    );
};

const getArticles = async (
    apolloClient,
    baseUrl,
    result = [],
    cursor = null
) => {
    const response = await apolloClient.query({
        query: GET_ARTICLES,
        variables: {
            pagination: { count: 100, after: cursor },
        },
    });

    const newResult = [
        ...result,
        ...response.data.articles.edges.map((edge) => ({
            loc: url(baseUrl, `/community/articles/${edge.node.id}`),
            changefreq: 'monthly',
        })),
    ];

    if (response.data.articles.pageInfo.hasNextPage) {
        return await getArticles(
            apolloClient,
            baseUrl,
            newResult,
            response.data.articles.pageInfo.endCursor
        );
    }

    return newResult.reduce(
        (result, currentResult) => [...result, currentResult],
        []
    );
};

const getOtherSitemapInfo = async (apolloClient, baseUrl) => {
    const sitemapInfo = (
        await apolloClient.query({
            query: GET_OTHER,
        })
    ).data;

    return {
        categories: sitemapInfo.categories.map((category) => ({
            loc: url(baseUrl, `/c/${category.alias}`),
            changefreq: 'always',
        })),
        brands: sitemapInfo.brands.map((brand) => ({
            loc: url(baseUrl, `/b/${brand.alias}`),
            changefreq: 'weekly',
        })),
    };
};

const staticUrls = (baseUrl) =>
    [
        {
            loc: '/',
            changefreq: 'always',
        },
        {
            loc: '/about',
            changefreq: 'monthly',
        },
        {
            loc: '/refund-policy',
            changefreq: 'monthly',
        },
        {
            loc: '/privacy-policy',
            changefreq: 'weekly',
        },
        {
            loc: '/wishes',
            changefreq: 'daily',
        },
    ].map((u) => ({ ...u, loc: url(baseUrl, u.loc) }));

export default async (req, res, next) => {
    const baseUrl = 'https://' + req.get('host');

    const sitemapInfo = await getOtherSitemapInfo(req.apolloClient, baseUrl);
    const products = await getProducts(req.apolloClient, baseUrl);
    const articles = await getArticles(req.apolloClient, baseUrl);

    const urlsets = [
        ...staticUrls(baseUrl),
        ...products,
        ...articles,
        ...sitemapInfo.categories,
        ...sitemapInfo.brands,
    ].map((loc) => ({
        url: Object.entries(loc).map(([key, value]) => ({
            [key]: value,
        })),
    }));

    res.set('Content-Type', 'text/xml').send(
        xml(
            {
                urlset: [
                    {
                        _attr: {
                            xmlns:
                                'http://www.sitemaps.org/schemas/sitemap/0.9',
                        },
                    },
                    ...urlsets,
                ],
            },
            { declaration: true }
        )
    );
};
