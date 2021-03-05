import gql from 'graphql-tag';
import { useLazyQuery } from '@apollo/react-hooks';

const QUERY = gql`
    query GetBringPostalCode($postalCode: String!) {
        bringPostalCode(postalCode: $postalCode) {
            city
            postalCode
        }
    }
`;

export default () => useLazyQuery(QUERY);
