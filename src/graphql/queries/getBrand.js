import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';

const QUERY = gql`
    query GetBrandPageInfo($brandId: Int, $alias: String) {
        brand(id: $brandId, alias: $alias) {
            id
            name
            alias
        }
    }
`;

export default (brandId, alias) => {
    return useQuery(QUERY, {
        variables: {
            brandId: parseInt(brandId),
            alias,
        },
    });
};
