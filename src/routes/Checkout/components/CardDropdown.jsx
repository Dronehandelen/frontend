import React from 'react';
import { Alert, Card, FormGroup, Label } from 'reactstrap';
import styled, { css } from 'styled-components';
import {
    CardCVCElement,
    CardExpiryElement,
    CardNumberElement,
} from 'react-stripe-elements';
import DropDown from '../../../components/Dropdown/DropDown.jsx';
import DropDownToggle from '../../../components/Dropdown/DropDownToggle.jsx';
import DropDownMenu from '../../../components/Dropdown/DropDownMenu.jsx';
import DropDownItem from '../../../components/Dropdown/DropDownItem.jsx';
import CardPreview from './CardPreview.jsx';
import AddCardDropDownItem from './AddCardDropDownItem.jsx';
import Checkbox from '../../../components/Checkbox/Checkbox.jsx';
import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client';
import AuthContext from '../../../contexts/auth.js';

const styledInput = css`
    border: 1px solid rgba(0, 0, 0, 0.125);
    padding: 15px 5px;
    background-color: white;
`;

const StyledCardNumberElement = styled(CardNumberElement)`
    ${styledInput}
`;

const StyledCardExpiryElement = styled(CardExpiryElement)`
    ${styledInput}
`;

const StyledCardCVCElement = styled(CardCVCElement)`
    ${styledInput}
`;

const removeCardMutation = gql`
    mutation RemoveStripeCard($paymentMethodId: String!) {
        removeStripeCard(paymentMethodId: $paymentMethodId)
    }
`;

const CardDropdown = ({
    userCards,
    selectedCard,
    setSelectedCard,
    saveCard,
    setSaveCard,
    refetchCards,
}) => {
    const [removeCard] = useMutation(removeCardMutation);
    const { user } = React.useContext(AuthContext);
    const [errorOnDeleteCard, setErrorOnDeleteCard] = React.useState(false);
    const [deleteCardSuccess, setDeleteCardSuccess] = React.useState(false);

    return (
        <div>
            {userCards.length !== 0 && (
                <DropDown>
                    <div
                        style={{ backgroundColor: 'white' }}
                        className="d-flex"
                    >
                        <div style={{ flex: 1 }}>
                            <DropDownToggle>
                                {!selectedCard && <AddCardDropDownItem />}
                                {selectedCard && (
                                    <CardPreview
                                        brand={selectedCard.brand}
                                        last4={selectedCard.last4}
                                        expMonth={selectedCard.expMonth}
                                        expYear={selectedCard.expYear}
                                    />
                                )}
                            </DropDownToggle>
                        </div>
                        {selectedCard && (
                            <div
                                className="d-flex flex-column justify-content-center px-4"
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                    setErrorOnDeleteCard(false);
                                    removeCard({
                                        variables: {
                                            paymentMethodId:
                                                selectedCard.paymentMethodId,
                                        },
                                    })
                                        .then(() => {
                                            setDeleteCardSuccess(true);
                                            refetchCards();
                                            setTimeout(() => {
                                                setDeleteCardSuccess(false);
                                            }, 2000);
                                        })
                                        .catch((e) => {
                                            console.error(e);
                                            setErrorOnDeleteCard(true);
                                        });
                                }}
                            >
                                <i className="fa fa-trash" />
                            </div>
                        )}
                    </div>
                    <DropDownMenu>
                        {userCards
                            .filter(
                                (userCard) =>
                                    !selectedCard ||
                                    userCard.paymentMethodId !==
                                        selectedCard.paymentMethodId
                            )
                            .map((userCard) => (
                                <DropDownItem
                                    key={userCard.paymentMethodId}
                                    onClick={() => setSelectedCard(userCard)}
                                >
                                    <CardPreview
                                        brand={userCard.brand}
                                        last4={userCard.last4}
                                        expMonth={userCard.expMonth}
                                        expYear={userCard.expYear}
                                    />
                                </DropDownItem>
                            ))}
                        {selectedCard && (
                            <DropDownItem onClick={() => setSelectedCard(null)}>
                                <AddCardDropDownItem />
                            </DropDownItem>
                        )}
                    </DropDownMenu>
                </DropDown>
            )}
            {errorOnDeleteCard && (
                <Alert color="danger" className="mt-3">
                    Noe skjedde når vi prøvde å slette kortet ditt. Vennligst
                    prøv igjen senere eller ta kontakt med oss.
                </Alert>
            )}
            {deleteCardSuccess && (
                <Alert color="success" className="mt-3">
                    Kortet ditt er slettet.
                </Alert>
            )}
            {!selectedCard && (
                <>
                    <div className="d-flex mt-2">
                        <FormGroup style={{ flex: 2 }}>
                            <Label>Kortnummer</Label>
                            <div>
                                <StyledCardNumberElement />
                            </div>
                        </FormGroup>
                        <FormGroup style={{ flex: 1 }}>
                            <Label>Utløpsdato</Label>
                            <div>
                                <StyledCardExpiryElement />
                            </div>
                        </FormGroup>
                        <FormGroup style={{ flex: 1 }}>
                            <Label>CVC</Label>
                            <div>
                                <StyledCardCVCElement />
                            </div>
                        </FormGroup>
                    </div>
                    {user && (
                        <Card body>
                            <Checkbox
                                checked={saveCard}
                                toggle={() => setSaveCard(!saveCard)}
                            >
                                Lagre kortet (valgfritt)
                            </Checkbox>
                            <div className="mt-3">
                                Du kan trygt lagre kortet ditt hos oss om du
                                ønsker at handelen skal gå raskere neste gang.
                            </div>
                        </Card>
                    )}
                </>
            )}
        </div>
    );
};

export default CardDropdown;
