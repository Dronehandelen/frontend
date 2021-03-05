import { useMutation } from 'react-apollo';
import gql from 'graphql-tag';
import cart from '../fragments/cart.js';
import { QUERY } from '../queries/getCart.js';

const MUTATION = gql`
    mutation SetCartProduct($productId: Int!, $amount: Int!) {
        setCartProduct(productId: $productId, amount: $amount) {
            ...CartFragment
        }
    }
    ${cart}
`;

export default (cartToken) =>
    useMutation(MUTATION, {
        update(cache, { data: { setCartProduct } }) {
            cache.writeQuery({
                query: QUERY,
                variables: {
                    token: cartToken,
                },
                data: { cart: setCartProduct },
            });
        },
    });
