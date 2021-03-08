import { useMutation, gql } from '@apollo/client';

const EDIT_PRODUCT = gql`
    mutation EditProduct($product: ProductInput!, $id: Int) {
        product(id: $id, product: $product) {
            id
            description
            shortDescription
            originalPrice
            price
            title
            isPublished
            images {
                fileId
                url
            }
            primaryImage {
                fileId
                url
            }
            brandId
        }
    }
`;

export default () => useMutation(EDIT_PRODUCT);
