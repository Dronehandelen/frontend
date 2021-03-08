import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';

const MUTATION = gql`
    mutation CaptureOrderFunds($orderId: Int!) {
        captureOrderFunds(orderId: $orderId) {
            id
        }
    }
`;

export default () => useMutation(MUTATION);
