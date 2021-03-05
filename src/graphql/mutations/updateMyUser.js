import { useMutation } from 'react-apollo';
import gql from 'graphql-tag';

const MUTATION = gql`
    mutation UpdateMyUser(
        $firstName: String!
        $lastName: String!
        $phone: String!
        $address: AddressInput!
    ) {
        updateMyUser(
            firstName: $firstName
            lastName: $lastName
            phone: $phone
            address: $address
        ) {
            id
        }
    }
`;

export default () => useMutation(MUTATION);
