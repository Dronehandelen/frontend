import { useMutation } from 'react-apollo';
import gql from 'graphql-tag';

const MUTATION = gql`
    mutation TagGroup($name: String!) {
        tagGroup(name: $name) {
            id
            name
        }
    }
`;

export default () => useMutation(MUTATION);
