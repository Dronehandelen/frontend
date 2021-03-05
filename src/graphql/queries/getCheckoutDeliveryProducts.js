import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';

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
