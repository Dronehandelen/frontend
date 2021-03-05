import gql from 'graphql-tag';
import { productFragment } from '../../components/Product/Product.jsx';

export default gql`
    fragment CartFragment on Cart {
        products {
            amount
            product {
                id
                alias
                description
                shortDescription
                originalPrice
                price
                title
                stock
                countAvailableForBackorder
                backorderMessage
                primaryImage {
                    fileId
                    url
                }
            }
        }
        relatedProducts {
            ...ProductFragment
        }
    }
    ${productFragment}
`;
