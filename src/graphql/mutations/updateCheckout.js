import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';
import checkoutFragment from '../fragments/checkout.js';
import { GET_CHECKOUT } from '../queries/getCheckout.js';

const UPDATE_CHECKOUT = gql`
    mutation UpdateCheckout(
        $postalOfficeId: String
        $deliveryInfo: CheckoutDeliveryInfoInput
        $email: String
        $deliveryType: String
        $paymentMethod: String
        $setProductsFromCart: Boolean
        $keepAlive: Boolean
    ) {
        updateCheckout(
            newPostalOfficeId: $postalOfficeId
            deliveryInfo: $deliveryInfo
            email: $email
            deliveryType: $deliveryType
            paymentMethod: $paymentMethod
            setProductsFromCart: $setProductsFromCart
            keepAlive: $keepAlive
        ) {
            ${checkoutFragment}
        }
    }
`;

export default () =>
    useMutation(UPDATE_CHECKOUT, {
        update(cache, { data: { updateCheckout } }) {
            cache.writeQuery({
                query: GET_CHECKOUT,
                data: { getCheckout: updateCheckout },
            });
        },
    });
