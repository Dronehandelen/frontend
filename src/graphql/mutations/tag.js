import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';

const TAG = gql`
    mutation Tag($name: String!, $tagGroupId: Int!) {
        tag(name: $name, tagGroupId: $tagGroupId) {
            id
            name
        }
    }
`;

export default () => useMutation(TAG);
