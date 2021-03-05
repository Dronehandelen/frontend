import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';

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
