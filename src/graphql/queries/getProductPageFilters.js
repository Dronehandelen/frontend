import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';

const QUERY = gql`
    query GetProductFilters($filters: ProductFilters) {
        productFilters(filters: $filters) {
            brands {
                productCount
                brand {
                    id
                    name
                }
            }
            tags {
                productCount
                tag {
                    id
                    name
                    tagGroup {
                        id
                        name
                    }
                }
            }
            categories {
                productCount
                category {
                    id
                    name
                    parentCategory {
                        id
                        name
                        parentCategory {
                            id
                            name
                        }
                    }
                }
            }
        }
    }
`;

export default (filters) => {
    return useQuery(QUERY, {
        variables: {
            filters: {
                ...filters,
                categories: filters.categoryIds,
                categoryIds: undefined,
            },
        },
        errorPolicy: 'all',
    });
};
