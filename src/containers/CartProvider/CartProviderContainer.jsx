import React from 'react';
import CartProvider from './CartProvider';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';

const CartProviderContainer = (props) => {
    const location = useLocation();

    const cartToken = React.useMemo(() => {
        const query = queryString.parse(location.search);
        return query.cartToken || null;
    }, []);

    return <CartProvider cartToken={cartToken}>{props.children}</CartProvider>;
};

export default CartProviderContainer;
