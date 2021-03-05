import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';

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
