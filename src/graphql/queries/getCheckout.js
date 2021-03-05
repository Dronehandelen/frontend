import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';
import checkoutFragment from '../fragments/checkout.js';

export const GET_CHECKOUT = gql`
     query GetCheckout {
        getCheckout {
            ${checkoutFragment}
        }
    }
`;

export default () => useQuery(GET_CHECKOUT);
