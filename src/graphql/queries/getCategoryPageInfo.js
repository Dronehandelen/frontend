import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';

const QUERY = gql`
    query GetProducts($categoryId: Int!) {
        category(id: $categoryId) {
            id
            name
        }
        productFilters(categoryId: $categoryId) {
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

export default (categoryId) => {
    return useQuery(QUERY, {
        variables: {
            categoryId,
        },
        errorPolicy: 'all',
    });
};
