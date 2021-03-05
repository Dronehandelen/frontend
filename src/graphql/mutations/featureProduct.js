import { useMutation } from 'react-apollo';
import gql from 'graphql-tag';

const MUTATION = gql`
    mutation FeatureProduct($productId: Int!) {
        featureProduct(productId: $productId)
    }
`;

export default () => useMutation(MUTATION);
