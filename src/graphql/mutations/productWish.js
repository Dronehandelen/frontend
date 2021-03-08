import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';

const MUTATION = gql`
    mutation ProductWish($name: String!) {
        productWish(name: $name) {
            id
        }
    }
`;

export default () => useMutation(MUTATION);
