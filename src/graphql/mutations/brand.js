import { useMutation } from 'react-apollo';
import gql from 'graphql-tag';

const BRAND = gql`
    mutation Brand($name: String!) {
        brand(name: $name) {
            id
            name
        }
    }
`;

export default () => useMutation(BRAND);
