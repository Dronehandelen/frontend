import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';

const QUERY = gql`
    query GetProductWishes {
        productWishes {
            edges {
                node {
                    id
                    productName
                    likesCount
                    isLikedByCurrentUser
                }
            }
        }
    }
`;

export default () => useQuery(QUERY);
