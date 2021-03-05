import { useMutation } from 'react-apollo';
import gql from 'graphql-tag';

const MUTATION = gql`
    mutation OrderReceivedByCustomer($orderId: Int!, $date: DateTime!) {
        orderReceivedByCustomer(orderId: $orderId, date: $date)
    }
`;

export default () => useMutation(MUTATION);
