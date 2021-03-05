import { useMutation } from 'react-apollo';
import gql from 'graphql-tag';

const TAG = gql`
    mutation Tag($name: String!, $tagGroupId: Int!) {
        tag(name: $name, tagGroupId: $tagGroupId) {
            id
            name
        }
    }
`;

export default () => useMutation(TAG);
