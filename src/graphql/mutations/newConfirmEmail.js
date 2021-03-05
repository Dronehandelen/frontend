import { useMutation } from 'react-apollo';
import gql from 'graphql-tag';

const NEW_CONFIRM_EMAIL = gql`
    mutation NewConfirmEmail {
        newConfirmEmail
    }
`;

export default () => useMutation(NEW_CONFIRM_EMAIL);
