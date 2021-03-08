import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';

const QUERY = gql`
    query GetBringDeliveryProducts {
        checkoutDeliveryOptions {
            id
            name
            price
        }
    }
`;

export default () => useQuery(QUERY, { fetchPolicy: 'network-only' });
