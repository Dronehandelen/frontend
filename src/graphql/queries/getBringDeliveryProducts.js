import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';

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
