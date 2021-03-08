import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';

const QUERY = gql`
    mutation UpdateOrderTrackingCode($orderId: Int!, $trackingCode: String!) {
        setTrackingCode(orderId: $orderId, trackingCode: $trackingCode) {
            id
        }
    }
`;

export default () => useMutation(QUERY);
