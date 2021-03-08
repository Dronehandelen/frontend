import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';

const MUTATION = gql`
    mutation VideoPost($videoPost: VideoPostInput!) {
        videoPost(videoPost: $videoPost) {
            id
        }
    }
`;

export default () => useMutation(MUTATION);
