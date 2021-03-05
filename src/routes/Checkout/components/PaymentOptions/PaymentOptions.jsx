import React from 'react';
import appConfig from '../../../../config/app.js';
import Stripe from './Stripe.jsx';
import Vipps from './Vipps.jsx';

const PaymentOptions = ({
    paymentMethod,
    stripeVariables,
    vippsVariables,
    onSetPaymentMethod,
}) => {
    return (
        <>
            <Stripe
                stripeVariables={stripeVariables}
                selected={appConfig.paymentMethods.STRIPE === paymentMethod}
                onSelect={() =>
                    onSetPaymentMethod(appConfig.paymentMethods.STRIPE)
                }
            />
            <Vipps
                vippsVariables={vippsVariables}
                selected={appConfig.paymentMethods.VIPPS === paymentMethod}
                onSelect={() =>
                    onSetPaymentMethod(appConfig.paymentMethods.VIPPS)
                }
            />
        </>
    );
};

export default PaymentOptions;
