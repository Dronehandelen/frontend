import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';

const QUERY = gql`
    query getTags {
        tagGroups {
            id
            name
            tags {
                id
                name
            }
        }
    }
`;

export default () => useQuery(QUERY);
