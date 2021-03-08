import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';

const MUTATION = gql`
    mutation OrderReceivedByCustomer($orderId: Int!, $date: DateTime!) {
        orderReceivedByCustomer(orderId: $orderId, date: $date)
    }
`;

export default () => useMutation(MUTATION);
