import { useMutation } from 'react-apollo';
import gql from 'graphql-tag';

const MUTATION = gql`
    mutation ProductWish($name: String!) {
        productWish(name: $name) {
            id
        }
    }
`;

export default () => useMutation(MUTATION);
