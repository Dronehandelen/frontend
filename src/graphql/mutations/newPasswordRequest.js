import { useMutation } from 'react-apollo';
import gql from 'graphql-tag';

const MUTATION = gql`
    mutation NewPasswordRequest($email: String!) {
        newPasswordRequest(email: $email)
    }
`;

export default () => useMutation(MUTATION);
