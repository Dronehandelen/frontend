import React from 'react';
import Cart from './Cart.jsx';
import useUpdateCheckoutMutation from '../../graphql/mutations/updateCheckout.js';
import { getError } from '../../helpers/error.js';
import * as Sentry from '@sentry/react';
import CartContext from '../../contexts/cartContext.js';
import tracking from '../../helpers/tracking.js';

export default (props) => {
    const [updateCheckout] = useUpdateCheckoutMutation();
    const [status, setStatus] = React.useState({
        loading: false,
        error: false,
    });
    const {
        setProductAmount,
        products,
        totalPrice,
        refetchCart,
        loading: loadingCart,
        relatedProducts,
    } = React.useContext(CartContext);

    return (
        <Cart
            {...props}
            cartItems={products}
            onSetAmount={setProductAmount}
            totalPrice={totalPrice}
            status={status}
            loadingCart={loadingCart}
            relatedProducts={relatedProducts}
            toCheckout={async () => {
                setStatus({ loading: true, error: false });
                try {
                    await updateCheckout({
                        variables: {
                            setProductsFromCart: true,
                        },
                    });
                    tracking.initiateCheckout(products, totalPrice);

                    props.history.push('/checkout');
                    setStatus({ loading: false, error: false });
                } catch (e) {
                    Sentry.captureException(e);
                    let error = getError(e);

                    if (
                        error.type === 'validation' &&
                        error.error.messages.length !== 0 &&
                        error.error.messages[0].message === 'not_in_stock'
                    ) {
                        error =
                            'Vi har ikke nok varer på lager til å fullføre din bestilling.';
                        refetchCart();
                    } else {
                        error = 'Noe skjedde';
                    }

                    setStatus({ loading: false, error });
                }
            }}
        />
    );
};
