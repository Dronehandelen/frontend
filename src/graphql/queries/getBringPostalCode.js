import { gql } from '@apollo/client';
import { useLazyQuery } from '@apollo/client';

const QUERY = gql`
    query GetBringPostalCode($postalCode: String!) {
        bringPostalCode(postalCode: $postalCode) {
            city
            postalCode
        }
    }
`;

export default () => useLazyQuery(QUERY);
