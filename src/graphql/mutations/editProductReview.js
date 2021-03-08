import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';

const EDIT_PRODUCT_REVIEW = gql`
    mutation EditProductReview($review: String, $stars: Int!, $productId: Int) {
        productReview(review: $review, stars: $stars, productId: $productId) {
            id
        }
    }
`;

export default () => useMutation(EDIT_PRODUCT_REVIEW);
