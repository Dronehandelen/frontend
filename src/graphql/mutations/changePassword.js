import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';

const MUTATION = gql`
    mutation ChangePassword($password: String!) {
        changePassword(password: $password)
    }
`;

export default () => useMutation(MUTATION);
