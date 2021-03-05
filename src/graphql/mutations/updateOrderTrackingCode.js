import { useMutation } from 'react-apollo';
import gql from 'graphql-tag';

const QUERY = gql`
    mutation UpdateOrderTrackingCode($orderId: Int!, $trackingCode: String!) {
        setTrackingCode(orderId: $orderId, trackingCode: $trackingCode) {
            id
        }
    }
`;

export default () => useMutation(QUERY);
