import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';

const NEW_CONFIRM_EMAIL = gql`
    mutation NewConfirmEmail {
        newConfirmEmail
    }
`;

export default () => useMutation(NEW_CONFIRM_EMAIL);
