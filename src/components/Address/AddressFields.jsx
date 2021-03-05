import React from 'react';
import ManagedFormGroup from '../ManagedFormGroup.jsx';
import { FormFeedback, Input, Label } from 'reactstrap';
import useGetBringPostalCodeLazyQuery from '../../graphql/queries/getBringPostalCode.js';

const AddressFields = ({ error, state, setState, keyPrefix = '' }) => {
    const [overwritePostalPlace, setOverwritePostalPlace] = React.useState(
        false
    );

    const [
        getPostalCode,
        { data: postalCodeData, error: postalCodeError },
    ] = useGetBringPostalCodeLazyQuery();

    React.useEffect(() => {
        if (
            postalCodeData &&
            postalCodeData.bringPostalCode.postalCode === state.postalCode &&
            state.postalPlace !== postalCodeData.bringPostalCode.city
        ) {
            setState({
                ...state,
                postalPlace: postalCodeData.bringPostalCode.city,
            });
            setOverwritePostalPlace(false);
        }
    }, [postalCodeData, state, setState]);

    return (
        <>
            <ManagedFormGroup error={error} inputKey={keyPrefix + 'address'}>
                {(errors) => (
                    <>
                        <Label>Gate / vei</Label>
                        <Input
                            type="text"
                            name="address"
                            placeholder=""
                            value={state.address}
                            onChange={(e) =>
                                setState({
                                    address: e.target.value,
                                })
                            }
                            invalid={!!errors}
                        />
                    </>
                )}
            </ManagedFormGroup>
            <div className="d-flex">
                <div className="mr-1 flex-grow-1" style={{ flexBasis: '50%' }}>
                    <ManagedFormGroup
                        error={error}
                        inputKey={keyPrefix + 'postalCode'}
                        style={{ flex: 1 }}
                    >
                        {(errors) => (
                            <>
                                <Label>Postnummer</Label>
                                <Input
                                    type="text"
                                    name="postalCode"
                                    placeholder=""
                                    value={state.postalCode}
                                    onChange={(e) => {
                                        setState({
                                            postalCode: e.target.value,
                                        });

                                        if (e.target.value.length === 4) {
                                            getPostalCode({
                                                variables: {
                                                    postalCode: e.target.value,
                                                },
                                            });
                                        }
                                    }}
                                    invalid={!!errors || !!postalCodeError}
                                    onBlur={() => {
                                        if (state.postalCode.length === 4) {
                                        }
                                    }}
                                />
                                {!!postalCodeError && (
                                    <FormFeedback>
                                        Vi fant ikke dette postnummeret. Du kan
                                        skrive poststed manuelt ved å trykke{' '}
                                        <span
                                            className="btn-link"
                                            style={{
                                                cursor: 'pointer',
                                            }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                e.preventDefault();
                                                setOverwritePostalPlace(true);
                                            }}
                                        >
                                            her
                                        </span>
                                    </FormFeedback>
                                )}
                            </>
                        )}
                    </ManagedFormGroup>
                </div>
                <div className="flex-grow-1" style={{ flexBasis: '50%' }}>
                    <ManagedFormGroup
                        error={error}
                        inputKey={keyPrefix + 'postalPlace'}
                        style={{ flex: 3 }}
                    >
                        {(errors) => (
                            <>
                                <Label>Poststed</Label>
                                <Input
                                    type="text"
                                    name="postalPlace"
                                    placeholder=""
                                    value={state.postalPlace}
                                    onChange={(e) =>
                                        setState({
                                            postalPlace: e.target.value,
                                        })
                                    }
                                    invalid={!!errors}
                                    disabled={!overwritePostalPlace}
                                />
                            </>
                        )}
                    </ManagedFormGroup>
                </div>
            </div>
            <ManagedFormGroup error={error} inputKey={keyPrefix + 'co'}>
                {(errors) => (
                    <>
                        <Label>C/O adresse (valgfritt)</Label>
                        <Input
                            type="text"
                            name="co"
                            placeholder="Eks. navn på postkasse"
                            value={state.co}
                            onChange={(e) =>
                                setState({
                                    co: e.target.value,
                                })
                            }
                            invalid={!!errors}
                        />
                    </>
                )}
            </ManagedFormGroup>
        </>
    );
};

export default AddressFields;
