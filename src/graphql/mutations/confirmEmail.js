import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';

const CONFIRM_EMAIL = gql`
    mutation ConfirmEmail($token: String!) {
        confirmEmail(token: $token)
    }
`;

export default () => useMutation(CONFIRM_EMAIL);
