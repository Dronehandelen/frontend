import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';

const MUTATION = gql`
    mutation NewPasswordRequest($email: String!) {
        newPasswordRequest(email: $email)
    }
`;

export default () => useMutation(MUTATION);
