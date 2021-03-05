import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';

const QUERY = gql`
    query GetBrandPageInfo($brandId: Int!) {
        brand(id: $brandId) {
            id
            name
        }
        productFilters(brandId: $brandId) {
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
        }
    }
`;

export default (brandId) => {
    return useQuery(QUERY, {
        variables: {
            brandId: parseInt(brandId),
        },
    });
};
