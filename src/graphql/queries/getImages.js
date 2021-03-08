import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';

const GET_IMAGES = gql`
    query GetImages($pagination: PaginationInput!) {
        images(pagination: $pagination) {
            edges {
                node {
                    fileId
                    url
                }
            }
            pageInfo {
                hasNextPage
            }
        }
    }
`;

export default (count = 30, after = null) =>
    useQuery(GET_IMAGES, {
        variables: {
            pagination: {
                count,
                after,
            },
        },
    });
