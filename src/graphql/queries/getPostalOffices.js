import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';

const GET_POSTAL_OFFICES = gql`
    query GetPostalOffices($postalCode: String!) {
        postalOffices(postalCode: $postalCode) {
            id
            name
        }
    }
`;

export default postalCode =>
    useQuery(GET_POSTAL_OFFICES, {
        variables: {
            postalCode,
        },
    });
