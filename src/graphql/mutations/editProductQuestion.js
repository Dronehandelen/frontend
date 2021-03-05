import { useMutation } from 'react-apollo';
import gql from 'graphql-tag';

const EDIT_PRODUCT_QUESTION = gql`
    mutation EditProductQuestion(
        $content: String!
        $parentId: Int
        $productId: Int!
    ) {
        productQuestion(
            content: $content
            productId: $productId
            parentId: $parentId
        ) {
            id
        }
    }
`;

export default () => useMutation(EDIT_PRODUCT_QUESTION);
