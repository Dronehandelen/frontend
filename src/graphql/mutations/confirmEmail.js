import { useMutation } from 'react-apollo';
import gql from 'graphql-tag';

const CONFIRM_EMAIL = gql`
    mutation ConfirmEmail($token: String!) {
        confirmEmail(token: $token)
    }
`;

export default () => useMutation(CONFIRM_EMAIL);
