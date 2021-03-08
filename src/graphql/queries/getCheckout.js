import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import checkoutFragment from '../fragments/checkout.js';

export const GET_CHECKOUT = gql`
     query GetCheckout {
        getCheckout {
            ${checkoutFragment}
        }
    }
`;

export default () => useQuery(GET_CHECKOUT);
