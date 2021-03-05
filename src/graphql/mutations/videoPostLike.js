import { useMutation } from 'react-apollo';
import gql from 'graphql-tag';

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
