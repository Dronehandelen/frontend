import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';

const MUTATION = gql`
    mutation ProductMonitor($productId: Int!) {
        productMonitor(productId: $productId)
    }
`;

export default () => useMutation(MUTATION);
