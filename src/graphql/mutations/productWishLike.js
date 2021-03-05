import { useMutation } from 'react-apollo';
import gql from 'graphql-tag';

const MUTATION = gql`
    mutation ProductWishLike($productWishId: Int!) {
        productWishLike(productWishId: $productWishId) {
            productWishId
        }
    }
`;

export default () => useMutation(MUTATION);
