import React from 'react';
import { Button, Card, Form, Input, Label, Spinner } from 'reactstrap';
import ManagedFormGroup from '../../components/ManagedFormGroup.jsx';
import { getError } from '../../helpers/error.js';
import tracking from '../../helpers/tracking.js';
import { AddressFields } from '../../components/Address/index.js';

const ContactInfo = ({ state, setState, onDone, updateCheckout }) => {
    const [status, setStatus] = React.useState({ error: null, loading: false });
    const error = status.error;

    React.useEffect(() => {
        tracking.checkoutAction(2);
    }, []);

    const onSubmit = async () => {
        if (status.loading) {
            return;
        }

        const messages = [];

        setStatus({
            loading: true,
            error: null,
        });

        if (state.phone.length < 8) {
            messages.push({
                key: 'phone',
                message: 'Vennligst legg inn gyldig telefonnummer',
            });
        }

        if (state.firstName.length < 2) {
            messages.push({
                key: 'firstName',
                message: 'Vennligst legg inn gyldig fornavn',
            });
        }

        if (state.lastName.length < 2) {
            messages.push({
                key: 'lastName',
                message: 'Vennligst legg inn gyldig etternavn',
            });
        }

        if (state.address.length < 2) {
            messages.push({
                key: 'address',
                message: 'Vennligst legg inn gyldig adresse',
            });
        }

        if (state.postalCode.length !== 4) {
            messages.push({
                key: 'postalCode',
                message: 'Vennligst legg inn gyldig postnummer',
            });
        }

        if (state.postalPlace.length === 0) {
            messages.push({
                key: 'postalPlace',
                message: 'Vennligst legg inn gyldig poststed',
            });
        }

        if (messages.length > 0) {
            setStatus({
                loading: false,
                error: {
                    type: 'validation',
                    error: {
                        messages,
                    },
                },
            });
        } else {
            tracking.event(
                'Checkout',
                'Kontaktinformasjonskort - Gå til neste steg'
            );

            try {
                await updateCheckout({
                    variables: {
                        deliveryInfo: {
                            firstName: state.firstName,
                            lastName: state.lastName,
                            phone: state.phone,
                            address: {
                                address: state.address,
                                postalCode: state.postalCode,
                                postalPlace: state.postalPlace,
                                co: state.co,
                            },
                        },
                    },
                });

                setStatus({
                    loading: false,
                    error: null,
                });

                onDone();
            } catch (e) {
                setStatus({
                    loading: false,
                    error: getError(e),
                });
            }
        }
    };

    return (
        <Card body>
            <h4>Leveringsinformasjon</h4>
            <Form
                onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onSubmit();
                }}
            >
                <ManagedFormGroup error={error} inputKey="phone">
                    {(errors) => (
                        <>
                            <Label>Telefon</Label>
                            <Input
                                type="text"
                                name="phone"
                                placeholder=""
                                value={state.phone}
                                onChange={(e) =>
                                    setState({
                                        phone: e.target.value,
                                    })
                                }
                                invalid={!!errors}
                            />
                        </>
                    )}
                </ManagedFormGroup>
                <div className="d-flex">
                    <ManagedFormGroup
                        error={error}
                        inputKey="firstName"
                        className="mr-1"
                        style={{ flex: 1 }}
                    >
                        {(errors) => (
                            <>
                                <Label>Fornavn</Label>
                                <Input
                                    type="text"
                                    name="firstName"
                                    placeholder=""
                                    value={state.firstName}
                                    onChange={(e) =>
                                        setState({
                                            firstName: e.target.value,
                                        })
                                    }
                                    invalid={!!errors}
                                />
                            </>
                        )}
                    </ManagedFormGroup>
                    <ManagedFormGroup
                        error={error}
                        inputKey="lastName"
                        style={{ flex: 1 }}
                    >
                        {(errors) => (
                            <>
                                <Label>Etternavn</Label>
                                <Input
                                    type="text"
                                    name="lastName"
                                    placeholder=""
                                    value={state.lastName}
                                    onChange={(e) =>
                                        setState({
                                            lastName: e.target.value,
                                        })
                                    }
                                    invalid={!!errors}
                                />
                            </>
                        )}
                    </ManagedFormGroup>
                </div>
                <AddressFields
                    error={error}
                    setState={(newAddress) => setState(newAddress)}
                    state={state}
                    keyPrefix=""
                />
                <Button block disabled={status.loading} color="primary">
                    {status.loading ? <Spinner /> : 'Neste'}
                </Button>
                {error && error.message && (
                    <div className="mt-4 text-danger">{error.message}</div>
                )}
            </Form>
        </Card>
    );
};

export default ContactInfo;
