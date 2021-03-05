import { useMutation } from 'react-apollo';
import gql from 'graphql-tag';

const MUTATION = gql`
    mutation VideoPost($videoPost: VideoPostInput!) {
        videoPost(videoPost: $videoPost) {
            id
        }
    }
`;

export default () => useMutation(MUTATION);
