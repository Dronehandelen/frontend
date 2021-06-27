import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';

const GET_POSTAL_OFFICES = gql`
    query GetPostalOffices($carrier: String!, $postalCode: String!) {
        postalOffices2(carrier: $carrier, postalCode: $postalCode) {
            id
            name
        }
    }
`;

export default (postalCode, carrier) =>
    useQuery(GET_POSTAL_OFFICES, {
        variables: {
            postalCode,
            carrier,
        },
    });
