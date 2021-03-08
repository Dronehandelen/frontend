import React from 'react';
import AlternativeWrapper from '../AlternativeWrapper.jsx';
import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client';

const MUTATION = gql`
    mutation StartVippsCheckout {
        startVippsCheckout {
            url
        }
    }
`;

export const handleVippsPayment = async (t, vippsVariables) => {
    const response = await vippsVariables.startVippsCheckout();

    window.location.href = response.data.startVippsCheckout.url;
};

export const useVippsVariables = () => {
    const [startVippsCheckout] = useMutation(MUTATION);
    return {
        startVippsCheckout,
    };
};

const Stripe = ({ selected, onSelect }) => {
    return (
        <AlternativeWrapper
            title={
                <img
                    width="100"
                    src="/vipps/vipps.svg"
                    alt=""
                    style={{ marginLeft: -15, marginTop: -10 }}
                />
            }
            onSelect={onSelect}
            selected={selected}
        />
    );
};

export default Stripe;
