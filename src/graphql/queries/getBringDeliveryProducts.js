import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';

const QUERY = gql`
    query GetBringDeliveryProducts($volume: Int!, $toPostalCode: String!) {
        bringDeliveryProducts(volume: $volume, toPostalCode: $toPostalCode) {
            id
            displayName
            price
        }
    }
`;

export default (volume, toPostalCode) =>
    useQuery(QUERY, { variables: { volume, toPostalCode } });
