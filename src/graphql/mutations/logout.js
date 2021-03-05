import { useMutation } from 'react-apollo';
import gql from 'graphql-tag';

const LOGOUT = gql`
    mutation Logout {
        logout
    }
`;

export default () => useMutation(LOGOUT);
