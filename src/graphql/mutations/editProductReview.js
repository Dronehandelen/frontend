import { useMutation } from 'react-apollo';
import gql from 'graphql-tag';

const EDIT_PRODUCT_REVIEW = gql`
    mutation EditProductReview($review: String, $stars: Int!, $productId: Int) {
        productReview(review: $review, stars: $stars, productId: $productId) {
            id
        }
    }
`;

export default () => useMutation(EDIT_PRODUCT_REVIEW);
