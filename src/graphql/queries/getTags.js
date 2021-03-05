import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';

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
