import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';

const CONFIRM_CHECKOUT = gql`
    mutation ConfirmCheckout($dryRun: Boolean) {
        confirmCheckout(dryRun: $dryRun) {
            order {
                id
                totalPrice
                orderProducts {
                    amount
                    price
                    product {
                        id
                        title
                    }
                }
            }
        }
    }
`;

export default () => useMutation(CONFIRM_CHECKOUT);
