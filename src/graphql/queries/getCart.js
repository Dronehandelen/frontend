import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import cart from '../fragments/cart.js';

export const QUERY = gql`
    query GetCart($token: String) {
        cart(token: $token) {
            ...CartFragment
        }
    }
    ${cart}
`;

export default (cartToken) => {
    return useQuery(QUERY, { variables: { token: cartToken } });
};
