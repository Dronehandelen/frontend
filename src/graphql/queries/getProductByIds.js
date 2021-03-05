import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';

const GET_PRODUCT_BY_ID = gql`
    query GetProducts($ids: [Int!]!) {
        productsByIds(ids: $ids) {
            id
            description
            shortDescription
            originalPrice
            price
            title
            isPublished
            stock
            images {
                fileId
                url
            }
            primaryImage {
                fileId
                url
            }
        }
    }
`;

export default (ids) =>
    useQuery(GET_PRODUCT_BY_ID, {
        variables: {
            ids,
        },
    });
