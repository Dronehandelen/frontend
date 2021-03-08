import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import { productFragment } from '../../components/Product/Product.jsx';

const GET_PRODUCTS = gql`
    query GetProducts(
        $filters: ProductFilters
        $pagination: PaginationInput!
        $orderBy: String!
    ) {
        products(
            filters: $filters
            pagination: $pagination
            orderBy: $orderBy
        ) {
            pageInfo {
                endCursor
                hasNextPage
            }
            edges {
                node {
                    ...ProductFragment
                }
            }
        }
    }
    ${productFragment}
`;

export default (
    filters = {},
    pagination = { count: 20 },
    orderBy = 'popularity'
) => {
    const data = useQuery(GET_PRODUCTS, {
        variables: {
            filters: filters.__productFilterState
                ? filters.getQueryFilters()
                : filters,
            pagination,
            orderBy,
        },
    });

    let fetchMore = null;

    if (data.data && data.data.products.pageInfo.hasNextPage) {
        fetchMore = async () => {
            await data.fetchMore({
                variables: {
                    pagination: {
                        ...pagination,
                        after: data.data.products.pageInfo.endCursor,
                    },
                },
                updateQuery: (prev, { fetchMoreResult }) => {
                    if (!fetchMoreResult) return prev;
                    return {
                        ...prev,
                        products: {
                            ...prev.products,
                            pageInfo: fetchMoreResult.products.pageInfo,
                            edges: [
                                ...prev.products.edges,
                                ...fetchMoreResult.products.edges,
                            ],
                        },
                    };
                },
            });
        };
    }

    return {
        ...data,
        fetchMore,
    };
};
