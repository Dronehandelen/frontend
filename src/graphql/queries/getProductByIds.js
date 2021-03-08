import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';

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
