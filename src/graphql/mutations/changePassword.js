import { useMutation } from 'react-apollo';
import gql from 'graphql-tag';

const MUTATION = gql`
    mutation ChangePassword($password: String!) {
        changePassword(password: $password)
    }
`;

export default () => useMutation(MUTATION);
