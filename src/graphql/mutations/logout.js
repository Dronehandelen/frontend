import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';

const LOGOUT = gql`
    mutation Logout {
        logout
    }
`;

export default () => useMutation(LOGOUT);
