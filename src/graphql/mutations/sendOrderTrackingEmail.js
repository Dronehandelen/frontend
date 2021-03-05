import { useMutation } from 'react-apollo';
import gql from 'graphql-tag';

const QUERY = gql`
    mutation SendOrderTrackingEmail($orderId: Int!) {
        sendOrderTrackingEmail(orderId: $orderId) {
            id
            shippingEmailSentAt
        }
    }
`;

export default () => useMutation(QUERY);
