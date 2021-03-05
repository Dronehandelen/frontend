import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';

const GET_CATEGORIES = gql`
    query GetCategories {
        categories {
            id
            alias
            name
            displayInHeader
            order
            childCategories {
                id
                alias
                name
                order
                displayInHeader
                childCategories {
                    id
                    alias
                    name
                    order
                    displayInHeader
                    childCategories {
                        id
                        alias
                        name
                        order
                        displayInHeader
                    }
                }
            }
        }
    }
`;

export default () => useQuery(GET_CATEGORIES);
