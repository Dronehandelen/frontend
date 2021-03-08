import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';

const MUTATION = gql`
    mutation VideoPostLike($videoPostId: Int!) {
        videoPostLike(videoPostId: $videoPostId) {
            videoPostId
            videoPost {
                id
                likesCount
                isLikedByCurrentUser
            }
        }
    }
`;

export default () => useMutation(MUTATION);
