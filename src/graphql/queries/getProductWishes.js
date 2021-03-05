import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';

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
