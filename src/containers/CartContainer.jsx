import React from 'react';
import CartContext from '../contexts/cartContext.js';

const CartContainer = ({ children }) => {
    const { setProductAmount, products } = React.useContext(CartContext);

    return children({
        cartItems: products,
        onSetAmount: (productId, amount) => setProductAmount(productId, amount),
        totalPrice: products.reduce(
            (total, cartItem) =>
                total + cartItem.amount * cartItem.product.price,
            0
        ),
    });
};

export default CartContainer;
