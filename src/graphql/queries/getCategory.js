import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';

const QUERY = gql`
    query GetCategory($categoryId: Int, $alias: String) {
        category(id: $categoryId, alias: $alias) {
            id
            alias
            name
            parentCategory {
                id
                alias
                name
            }
        }
    }
`;

export default (categoryId, alias) => {
    return useQuery(QUERY, {
        variables: {
            categoryId,
            alias,
        },
        errorPolicy: 'all',
    });
};
