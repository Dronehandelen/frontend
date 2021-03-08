import { gql } from '@apollo/client';
import { productCardFragment } from '../Product/ProductCard';

export const getProductQuery = gql`
    query GetAddedToCartProduct($id: Int) {
        product(id: $id) {
            id
            price
            title
            primaryImage {
                fileId
                url
            }
            relatedProducts {
                ...ProductCardFragment
            }
            accessories {
                ...ProductCardFragment
            }
        }
    }
    ${productCardFragment}
`;

export default getProductQuery;
