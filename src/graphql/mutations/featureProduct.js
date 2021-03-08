import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';

const MUTATION = gql`
    mutation FeatureProduct($productId: Int!) {
        featureProduct(productId: $productId)
    }
`;

export default () => useMutation(MUTATION);
