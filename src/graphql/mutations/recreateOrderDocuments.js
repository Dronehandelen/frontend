import { useMutation } from 'react-apollo';
import gql from 'graphql-tag';

const MUTATION = gql`
    mutation RecreateOrderDocuments($orderId: Int!) {
        recreateOrderDocuments(orderId: $orderId)
    }
`;

export default () => useMutation(MUTATION);
