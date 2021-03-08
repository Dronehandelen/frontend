import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';

const MUTATION = gql`
    mutation TagGroup($name: String!) {
        tagGroup(name: $name) {
            id
            name
        }
    }
`;

export default () => useMutation(MUTATION);
