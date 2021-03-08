import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';

const QUERY = gql`
    query GetVideoPosts($pagination: PaginationInput!) {
        videoPosts(pagination: $pagination) {
            pageInfo {
                endCursor
                hasNextPage
            }
            edges {
                node {
                    id
                    title
                    description
                    youtubeVideoId
                    updatedAt
                    createdAt
                    likesCount
                    isLikedByCurrentUser
                    postedBy {
                        firstName
                        lastName
                    }
                }
            }
        }
    }
`;
export default (pagination = { count: 10 }, orderBy = 'popularity') => {
    const data = useQuery(QUERY, {
        variables: {
            pagination,
        },
    });

    let fetchMore = null;

    if (data.data && data.data.videoPosts.pageInfo.hasNextPage) {
        fetchMore = async () => {
            await data.fetchMore({
                variables: {
                    pagination: {
                        ...pagination,
                        after: data.data.videoPosts.pageInfo.endCursor,
                    },
                },
                updateQuery: (prev, { fetchMoreResult }) => {
                    if (!fetchMoreResult) return prev;
                    return {
                        ...prev,
                        videoPosts: {
                            ...prev.videoPosts,
                            pageInfo: fetchMoreResult.videoPosts.pageInfo,
                            edges: [
                                ...prev.videoPosts.edges,
                                ...fetchMoreResult.videoPosts.edges,
                            ],
                        },
                    };
                },
            });
        };
    }

    return {
        ...data,
        fetchMore,
    };
};
