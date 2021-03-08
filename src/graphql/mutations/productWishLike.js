import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';

const MUTATION = gql`
    mutation ProductWishLike($productWishId: Int!) {
        productWishLike(productWishId: $productWishId) {
            productWishId
        }
    }
`;

export default () => useMutation(MUTATION);
