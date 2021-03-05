import { useMutation } from 'react-apollo';
import gql from 'graphql-tag';

const MUTATION = gql`
    mutation ProductMonitor($productId: Int!) {
        productMonitor(productId: $productId)
    }
`;

export default () => useMutation(MUTATION);
