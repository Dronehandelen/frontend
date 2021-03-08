import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';

const BRAND = gql`
    mutation Brand($name: String!) {
        brand(name: $name) {
            id
            name
        }
    }
`;

export default () => useMutation(BRAND);
