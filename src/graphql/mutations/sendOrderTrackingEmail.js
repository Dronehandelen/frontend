import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';

const QUERY = gql`
    mutation SendOrderTrackingEmail($orderId: Int!) {
        sendOrderTrackingEmail(orderId: $orderId) {
            id
            shippingEmailSentAt
        }
    }
`;

export default () => useMutation(QUERY);
