import React from 'react';
import { useQuery, gql } from '@apollo/client';
import ClientHeader from './ClientHeader.jsx';

const HeaderQuery = gql`
    query HeaderQuery {
        brands {
            id
            name
            alias
        }
        categories {
            id
            alias
            name
            displayInHeader
            order
            dynamicOrder
            childCategories {
                id
                alias
                name
                order
                dynamicOrder
                displayInHeader
                childCategories {
                    id
                    alias
                    name
                    order
                    dynamicOrder
                    displayInHeader
                    childCategories {
                        id
                        alias
                        name
                        order
                        dynamicOrder
                        displayInHeader
                    }
                }
            }
        }
    }
`;

const ClientHeaderContainer = ({ children }) => {
    const { data } = useQuery(HeaderQuery);

    return <ClientHeader data={data} />;
};

export default ClientHeaderContainer;
