import { useMutation } from 'react-apollo';
import gql from 'graphql-tag';

const REGISTER = gql`
    mutation Register(
        $email: String!
        $password: String!
        $firstName: String!
        $lastName: String!
        $newsletter: Boolean!
    ) {
        register(
            email: $email
            password: $password
            firstName: $firstName
            lastName: $lastName
            newsletter: $newsletter
        ) {
            id
        }
    }
`;

export default () => useMutation(REGISTER);
