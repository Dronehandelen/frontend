import React from 'react';
import { StripeProvider, Elements, injectStripe } from 'react-stripe-elements';
import { Alert, Button, Card, Col, Form, Spinner } from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as Sentry from '@sentry/react';
import appConfig from '../../config/app.js';
import tracking from '../../helpers/tracking';
import getGraphqlError from '../../helpers/getGraphqlError.js';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client';
import PaymentOptions from './components/PaymentOptions';
import {
    handleStripePayment,
    useStripeVariables,
} from './components/PaymentOptions/Stripe.jsx';
import {
    handleVippsPayment,
    useVippsVariables,
} from './components/PaymentOptions/Vipps.jsx';

const getCardsQuery = gql`
    query GetCardsQuery {
        auth {
            user {
                id
                stripeCards {
                    paymentMethodId
                    brand
                    last4
                    expYear
                    expMonth
                }
            }
        }
    }
`;

const Confirm = ({
    paymentIntentClientSecret,
    stripe,
    price,
    elements,
    confirmCheckout,
    isUpdatingCheckout,
    placeholder,
    deliveryType,
    shippingPrice,
    paymentMethod,
    onSetPaymentMethod,
}) => {
    const { loading, data, refetch: refetchCards } = useQuery(getCardsQuery, {
        errorPolicy: 'all',
    });
    const stripeCards = data && data.auth ? data.auth.user.stripeCards : [];
    const { t } = useTranslation();
    const [status, setStatus] = React.useState({ error: null, loading: false });
    const stripeVariables = useStripeVariables(stripeCards, refetchCards);
    const vippsVariables = useVippsVariables();
    const history = useHistory();

    React.useEffect(() => {
        if (!placeholder) {
            tracking.checkoutAction(4, deliveryType);
        }
    }, [placeholder, deliveryType]);

    const onSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (status.loading) {
            return;
        }

        tracking.event('Checkout', 'Betalkortet - Betal trykt');

        setStatus({
            loading: true,
            error: null,
        });

        try {
            await confirmCheckout({
                variables: {
                    dryRun: true,
                },
            });

            if (paymentMethod === appConfig.paymentMethods.STRIPE) {
                await handleStripePayment(
                    t,
                    stripe,
                    paymentIntentClientSecret,
                    elements,
                    stripeVariables
                );

                const response = await confirmCheckout();
                setStatus({
                    loading: false,
                    error: null,
                });

                tracking.checkoutAction(5);

                tracking.transactionDone(
                    price,
                    shippingPrice,
                    response.data.confirmCheckout.order
                );

                history.push('/checkout-done');
            } else if (paymentMethod === appConfig.paymentMethods.VIPPS) {
                await handleVippsPayment(t, vippsVariables);
            } else {
                throw new Error('Unkown payment method');
            }
        } catch (e) {
            tracking.event(
                'Checkout',
                'Betalkortet - noe skjedde under betalingen'
            );
            Sentry.captureException(e);

            let error = getGraphqlError(e, null);

            if (error) {
                const isNoStock =
                    error.type === 'validation' &&
                    error.error.messages.length !== 0 &&
                    error.error.messages[0].message === 'not_in_stock';
                if (isNoStock) {
                    error = (
                        <div>
                            <p>
                                Vi har ikke nok varer på lager for å fullføre
                                bestillingen din. Vennligst gå tilbake til
                                handlevogn for å oppdatere din bestilling. Dette
                                kan skyldes at noen har bestilt noe mens du
                                holdt på i handlevognen. Lurer du på noe er det
                                bare å ta kontakt med oss.
                            </p>
                            <Button
                                color="danger"
                                onClick={() => {
                                    window.location.replace('/cart');
                                }}
                            >
                                Gå til handlevognen
                            </Button>
                        </div>
                    );
                } else {
                    error = error.message;
                }
            } else {
                error = e.message;
            }

            setStatus({
                loading: false,
                error,
            });
        }
    };
    const buttonContent = `Betal ${price},-`;

    return (
        <Card
            body
            className="mt-2 bg-light"
            style={{ opacity: placeholder ? 0.5 : 1 }}
        >
            <div style={{ fontSize: '1.3em' }} className="mb-3">
                Betalingsinformasjon
            </div>
            {!placeholder && (
                <>
                    <PaymentOptions
                        paymentMethod={paymentMethod}
                        stripeVariables={stripeVariables}
                        vippsVariables={vippsVariables}
                        stripeCards={stripeCards}
                        onSetPaymentMethod={onSetPaymentMethod}
                    />
                    <div className="mt-3">
                        <Form onSubmit={onSubmit}>
                            <div className="text-muted mt-3">
                                Ved å trykke "{buttonContent}" bekrefter du at
                                du har lest og samtykker med våre{' '}
                                <Link
                                    to="/customer-support/order-terms"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Salgsbetingelser
                                </Link>{' '}
                                og{' '}
                                <Link
                                    to="/customer-support/refund-policy"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Retningslinjer for refusjon
                                </Link>
                            </div>
                            <Button
                                block
                                size="lg"
                                className="mt-3"
                                disabled={status.loading || isUpdatingCheckout}
                                color="success"
                            >
                                {loading || status.loading ? (
                                    <Spinner />
                                ) : (
                                    buttonContent
                                )}
                            </Button>
                            {status.error && (
                                <Alert color="danger" className="mt-3">
                                    {status.error}
                                </Alert>
                            )}
                        </Form>
                    </div>
                </>
            )}
        </Card>
    );
};

const InjectedForm = injectStripe(Confirm);

export default (props) => {
    const [stripe, setStripe] = React.useState(null);

    React.useEffect(() => {
        setStripe(window.Stripe(appConfig.stripePublicKey));
    }, []);

    return (
        <StripeProvider stripe={stripe}>
            <Elements>
                <InjectedForm {...props} />
            </Elements>
        </StripeProvider>
    );
};
