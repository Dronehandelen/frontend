import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';

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
