import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';

const GET_BRANDS = gql`
    query GetBrands($filters: BrandFilters) {
        brands(filters: $filters) {
            id
            name
            alias
        }
    }
`;

export default (filters = {}) =>
    useQuery(GET_BRANDS, { variables: { filters } });
