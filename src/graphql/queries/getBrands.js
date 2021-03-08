import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';

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
