import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';

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
