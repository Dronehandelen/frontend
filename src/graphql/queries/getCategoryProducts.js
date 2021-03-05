import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';

const GET_PRODUCTS = gql`
    query GetProducts($filters: ProductFilters, $pagination: PaginationInput!) {
        products(filters: $filters, pagination: $pagination) {
            edges {
                node {
                    id
                    description
                    shortDescription
                    originalPrice
                    price
                    title
                    isPublished
                    stock
                    images {
                        fileId
                        url
                    }
                    primaryImage {
                        fileId
                        url
                    }
                    brand {
                        id
                        name
                    }
                    stars {
                        rating
                        count
                    }
                }
            }
        }
    }
`;

export default (categoryId, tagIds, brandIds, count = 20) => {
    return useQuery(GET_PRODUCTS, {
        variables: {
            filters: {
                categories: [categoryId],
                tagIds,
                brandIds,
            },
            pagination: {
                count,
            },
        },
    });
};
