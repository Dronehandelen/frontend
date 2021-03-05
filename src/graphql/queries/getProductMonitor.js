import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';

const QUERY = gql`
    query GetProductMonitor($id: Int!) {
        product(id: $id) {
            id
            isMonitoring
        }
    }
`;

export default (productId) =>
    useQuery(QUERY, {
        variables: {
            id: productId,
        },
    });
