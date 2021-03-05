import React from 'react';
import { useLocation, matchPath } from 'react-router-dom';
import CartContext from '../../contexts/cartContext.js';
import tracking from '../../helpers/tracking';
import useGetCartQuery from '../../graphql/queries/getCart.js';
import useSetCartProductMutation from '../../graphql/mutations/setCartProduct.js';
import { default as ProductHelper } from '../../helpers/product.js';
import AddedToCartModalContainer from '../../components/AddedToCartModal/AddedToCartModalContainer.jsx';

const CartProvider = ({ children, cartToken }) => {
    const location = useLocation();
    const { data, loading, error, refetch } = useGetCartQuery(cartToken);
    const [setCartProduct] = useSetCartProductMutation(cartToken);

    const [updatingCart, setUpdatingCart] = React.useState(false);
    const [
        displayAddedModalForProductId,
        setDisplayAddedModalForProductId,
    ] = React.useState(null);

    const cartProducts = data && data.cart ? data.cart.products : [];
    const relatedProducts = data && data.cart ? data.cart.relatedProducts : [];

    const setProductAmount = async (productId, amount) => {
        if (
            !displayAddedModalForProductId &&
            !matchPath(location.pathname, {
                path: '/cart',
            })
        ) {
            setDisplayAddedModalForProductId(productId);
        }
        setUpdatingCart(true);
        await setCartProduct({
            variables: {
                productId: productId,
                amount,
            },
        });
        setUpdatingCart(false);
    };

    React.useEffect(() => {
        setDisplayAddedModalForProductId(null);
    }, [location]);

    return (
        <CartContext.Provider
            value={{
                loading: loading || updatingCart,
                error,
                cart: cartProducts,
                products: cartProducts,
                relatedProducts,
                refetchCart: () => refetch(),
                addProduct: async (product, amount = 1) => {
                    const augmentedProduct = ProductHelper(product);

                    const index = cartProducts.findIndex(
                        (cartItem) => cartItem.product.id === product.id
                    );

                    let newAmount =
                        index !== -1
                            ? cartProducts[index].amount + amount
                            : amount;

                    if (newAmount > augmentedProduct.totalCountAvailable()) {
                        newAmount = augmentedProduct.totalCountAvailable();
                    }

                    await setProductAmount(product.id, newAmount);

                    tracking.addToCart(product, amount);
                },
                getItemAmount: () =>
                    cartProducts.reduce(
                        (amount, currentCartItem) =>
                            amount + currentCartItem.amount,
                        0
                    ),
                setProductAmount,
                totalPrice: cartProducts.reduce(
                    (total, cartItem) =>
                        total + cartItem.amount * cartItem.product.price,
                    0
                ),
            }}
        >
            {children}
            {displayAddedModalForProductId && (
                <AddedToCartModalContainer
                    addedProductId={displayAddedModalForProductId}
                    onClose={() => setDisplayAddedModalForProductId(null)}
                />
            )}
        </CartContext.Provider>
    );
};

export default CartProvider;
