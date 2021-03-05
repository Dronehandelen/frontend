import { useMutation } from 'react-apollo';
import gql from 'graphql-tag';

const LOGIN = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            id
        }
    }
`;

export default () => useMutation(LOGIN);
