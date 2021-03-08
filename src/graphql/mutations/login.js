import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';

const LOGIN = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            id
        }
    }
`;

export default () => useMutation(LOGIN);
