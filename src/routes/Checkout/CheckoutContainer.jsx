import React from 'react';
import AuthContext from '../../contexts/auth.js';
import { Col, Container, Row, Spinner } from 'reactstrap';
import EmailInput from './EmailInput.jsx';
import Login from '../Login';
import ContactInfo from './ContactInfo.jsx';
import ContactInfoPreview from './ContactInfoPreview.jsx';
import Confirm from './Confirm.jsx';
import ItemsTable from './ItemsTable.jsx';
import DeliveryAlternatives from './components/DeliveryAlternatives';
import useGetCheckoutQuery from '../../graphql/queries/getCheckout.js';
import useUpdateCheckoutMutation from '../../graphql/mutations/updateCheckout.js';
import useConfirmCheckoutMutation from '../../graphql/mutations/confirmCheckout.js';
import tracking from '../../helpers/tracking.js';
import { defaultAddressValues } from '../../components/Address';
import Header from './components/Header.jsx';
import { gql, useMutation } from '@apollo/client';
import checkoutFragment from '../../graphql/fragments/checkout.js';

const BLOCK_CHECKOUT_FOR_PAYMENT = gql`
    mutation BlockCheckoutForPayment($priceInCent: Int!) {
        blockCheckoutForPayment(priceInCent: $priceInCent) {
            ${checkoutFragment}
        }
    }
`;

const CheckoutContainer = () => {
    const { data, loading, refetch } = useGetCheckoutQuery();
    const [_updateCheckout] = useUpdateCheckoutMutation();
    const [blockCheckoutForPayment] = useMutation(BLOCK_CHECKOUT_FOR_PAYMENT);
    const [confirmCheckout] = useConfirmCheckoutMutation();
    const { isAuthenticated, isAuthenticating } = React.useContext(AuthContext);
    const [isUpdatingCheckout, setIsUpdatingCheckout] = React.useState(false);

    const updateCheckout = React.useCallback(
        async (...props) => {
            setIsUpdatingCheckout(true);
            try {
                await _updateCheckout(...props);
            } catch (e) {
                setIsUpdatingCheckout(false);
                throw e;
            }
            setIsUpdatingCheckout(false);
        },
        [_updateCheckout]
    );

    React.useEffect(() => {
        const interval = setInterval(() => {
            if (!isUpdatingCheckout) {
                updateCheckout({
                    variables: {
                        keepAlive: true,
                    },
                });
            }
        }, 1000 * 60 * 10);

        return () => clearInterval(interval);
    }, [updateCheckout, isUpdatingCheckout]);

    const [state, _setState] = React.useState({
        showDeliveryInfoForm: false,
        showEmailForm: false,
        email: '',
        phone: '',
        firstName: '',
        lastName: '',
        ...defaultAddressValues,
    });

    const setState = React.useCallback(
        (newState) =>
            _setState((currentState) => ({
                ...currentState,
                ...newState,
            })),
        [_setState]
    );

    const checkoutData = data && data.getCheckout;
    const dataPostalOfficeId =
        checkoutData &&
        checkoutData.postalOffice &&
        checkoutData.postalOffice.id;

    const updateDeliveryMethod = React.useCallback(
        (deliveryType, postalOffice) => {
            const postalOfficeId = postalOffice ? postalOffice.id : null;
            setState({
                deliveryType,
                selectedPostalOfficeId: postalOfficeId,
            });

            updateCheckout({
                variables: {
                    deliveryType,
                    postalOfficeId: postalOfficeId,
                },
            }).then(() => {
                setState({
                    deliveryType: null,
                    selectedPostalOfficeId: null,
                });
            });
        },
        [
            state.selectedPostalOfficeId,
            dataPostalOfficeId,
            setState,
            updateCheckout,
        ]
    );

    const onEmailConfirmed = React.useCallback(
        (hasAccount) => {
            if (!hasAccount || state.showEmailForm) {
                updateCheckout({
                    variables: {
                        email: state.email,
                    },
                });
            }

            setState({
                hasAccount,
                showEmailForm: false,
            });
        },
        [updateCheckout, state.email, setState, state.showEmailForm]
    );

    if (isAuthenticating || loading) {
        return (
            <Container fluid className="mt-3">
                <Row>
                    <Col>
                        <div className="d-flex justify-content-center">
                            <Spinner />
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }

    const emailMissing = !isAuthenticated && checkoutData.email == null;
    const deliveryInfoMissing = checkoutData.deliveryInfo == null;
    const showDeliveryInfoForm =
        state.showDeliveryInfoForm || deliveryInfoMissing;
    const hasAllInfo =
        !emailMissing && !showDeliveryInfoForm && !state.showEmailForm;
    const showEmailForm =
        state.showEmailForm ||
        (!hasAllInfo && emailMissing && !state.hasAccount);
    const showLoginForm = !hasAllInfo && emailMissing && state.hasAccount;
    const showContactInfoForm =
        !hasAllInfo && showDeliveryInfoForm && !emailMissing;

    return (
        <>
            <Header />
            <div className="bg-light">
                <Container className="py-3">
                    <Row className="">
                        <Col md={6}>
                            <h1 className="text-center text-md-left">Kasse</h1>
                        </Col>
                        <Col md={6}>
                            {showEmailForm && (
                                <EmailInput
                                    email={state.email}
                                    setEmail={(email) =>
                                        setState({
                                            email,
                                        })
                                    }
                                    onEmailConfirmed={onEmailConfirmed}
                                />
                            )}
                            {showLoginForm && (
                                <Login
                                    redirect={false}
                                    onlyCard
                                    email={state.email}
                                    clean
                                />
                            )}
                            {!showContactInfoForm && !hasAllInfo && (
                                <ContactInfoPreview placeholder />
                            )}
                            {showContactInfoForm && (
                                <ContactInfo
                                    state={state}
                                    setState={setState}
                                    updateCheckout={updateCheckout}
                                    onDone={() =>
                                        setState({
                                            showDeliveryInfoForm: false,
                                        })
                                    }
                                />
                            )}
                            {hasAllInfo && (
                                <ContactInfoPreview
                                    deliveryInfo={checkoutData.deliveryInfo}
                                    email={checkoutData.email}
                                    onChange={() => {
                                        tracking.event(
                                            'Checkout',
                                            'Kontaktinformasjonskort - Endre resten'
                                        );
                                        setState({
                                            showDeliveryInfoForm: true,
                                            firstName:
                                                checkoutData.deliveryInfo
                                                    .firstName,
                                            lastName:
                                                checkoutData.deliveryInfo
                                                    .lastName,
                                            phone:
                                                checkoutData.deliveryInfo.phone,
                                            address:
                                                checkoutData.deliveryInfo
                                                    .address.address,
                                            postalCode:
                                                checkoutData.deliveryInfo
                                                    .address.postalCode,
                                            postalPlace:
                                                checkoutData.deliveryInfo
                                                    .address.postalPlace,
                                            co:
                                                checkoutData.deliveryInfo
                                                    .address.co,
                                        });
                                    }}
                                    onChangeEmail={() => {
                                        tracking.event(
                                            'Checkout',
                                            'Kontaktinformasjonskort - Endre e-post'
                                        );
                                        setState({
                                            showEmailForm: true,
                                            email: checkoutData.email,
                                        });
                                    }}
                                />
                            )}
                        </Col>
                    </Row>
                </Container>
            </div>
            <Container className="py-3">
                <Row className="">
                    <Col md={6}>
                        <ItemsTable
                            checkoutProducts={data.getCheckout.checkoutProducts}
                            shippingPrice={checkoutData.shippingPrice}
                            totalPrice={checkoutData.totalPrice}
                        />
                    </Col>
                    <Col md={6}>
                        {!hasAllInfo && (
                            <>
                                <DeliveryAlternatives placeholder />
                                <Confirm placeholder />
                            </>
                        )}
                        {hasAllInfo && (
                            <>
                                <DeliveryAlternatives
                                    shippingCost={checkoutData.shippingPrice}
                                    postalCode={
                                        checkoutData.deliveryInfo.address
                                            .postalCode
                                    }
                                    onUpdateDeliveryMethod={
                                        updateDeliveryMethod
                                    }
                                    selectedPostalOfficeId={
                                        state.selectedPostalOfficeId ||
                                        (checkoutData.postalOffice &&
                                            checkoutData.postalOffice.id)
                                    }
                                    deliveryType={
                                        state.deliveryType ||
                                        checkoutData.deliveryType
                                    }
                                />
                                <Confirm
                                    onSetPaymentMethod={(method) =>
                                        updateCheckout({
                                            variables: {
                                                paymentMethod: method,
                                            },
                                        })
                                    }
                                    placeholder={false}
                                    price={data.getCheckout.totalPrice}
                                    onCardToken={(
                                        token,
                                        card,
                                        rememberCard
                                    ) => {
                                        setState({
                                            cardToken: token,
                                            card,
                                            rememberCard,
                                        });
                                    }}
                                    confirmCheckout={confirmCheckout}
                                    blockCheckoutForPayment={
                                        blockCheckoutForPayment
                                    }
                                    isUpdatingCheckout={isUpdatingCheckout}
                                    refetch={refetch}
                                    deliveryType={
                                        state.deliveryType ||
                                        checkoutData.deliveryType
                                    }
                                    shippingPrice={checkoutData.shippingPrice}
                                    paymentMethod={checkoutData.paymentMethod}
                                />
                            </>
                        )}
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default CheckoutContainer;
