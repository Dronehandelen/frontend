import React from 'react';
import CardDropdown from '../CardDropdown.jsx';
import AlternativeWrapper from '../AlternativeWrapper.jsx';

export const handleStripePayment = async (
    t,
    stripe,
    paymentIntentClientSecret,
    elements,
    stripeVariables
) => {
    const paymentIntentResponse = await stripe.confirmCardPayment(
        paymentIntentClientSecret,
        {
            payment_method:
                stripeVariables.selectedCard !== null
                    ? stripeVariables.selectedCard.paymentMethodId
                    : {
                          card: elements.getElement('cardNumber'),
                      },
            setup_future_usage: stripeVariables.saveCard
                ? 'off_session'
                : undefined,
        }
    );

    if (paymentIntentResponse.error && paymentIntentResponse.error.code) {
        console.log(paymentIntentResponse.error);
        throw new Error(
            t(
                paymentIntentResponse.error.code === 'card_declined'
                    ? `stripeDeclineCodes.${paymentIntentResponse.error.decline_code}`
                    : `stripeErrors.${paymentIntentResponse.error.code}`,
                paymentIntentResponse.error.message
            )
        );
    }
};

export const useStripeVariables = (stripeCards, refetchStripeCards) => {
    const [selectedCard, setSelectedCard] = React.useState(null);
    const [saveCard, setSaveCard] = React.useState(false);

    React.useEffect(() => {
        setSelectedCard(stripeCards.length !== 0 ? stripeCards[0] : null);
    }, [stripeCards]);

    return {
        selectedCard,
        setSelectedCard,
        saveCard,
        setSaveCard,
        stripeCards,
        refetchStripeCards,
    };
};

const Stripe = ({ stripeVariables, selected, onSelect }) => {
    return (
        <AlternativeWrapper
            title={<span>Kort</span>}
            onSelect={onSelect}
            selected={selected}
        >
            <CardDropdown
                userCards={stripeVariables.stripeCards}
                selectedCard={stripeVariables.selectedCard}
                setSelectedCard={stripeVariables.setSelectedCard}
                saveCard={stripeVariables.saveCard}
                setSaveCard={stripeVariables.setSaveCard}
                refetchCards={stripeVariables.refetchCards}
            />
        </AlternativeWrapper>
    );
};

export default Stripe;
