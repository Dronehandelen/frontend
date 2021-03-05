import { useMutation } from 'react-apollo';
import gql from 'graphql-tag';

const MUTATION = gql`
    mutation CaptureOrderFunds($orderId: Int!) {
        captureOrderFunds(orderId: $orderId) {
            id
        }
    }
`;

export default () => useMutation(MUTATION);
