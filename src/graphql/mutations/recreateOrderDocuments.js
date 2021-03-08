import { useMutation, gql } from '@apollo/client';

const MUTATION = gql`
    mutation RecreateOrderDocuments($orderId: Int!) {
        recreateOrderDocuments(orderId: $orderId)
    }
`;

export default () => useMutation(MUTATION);
