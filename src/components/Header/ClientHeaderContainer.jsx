import React from 'react';
import { gql } from '@apollo/client';
import ClientHeader from './ClientHeader.jsx';
import startupContext from '../../contexts/startup';

export const headerFragment = gql`
    fragment HeaderFragment on Query {
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

const ClientHeaderContainer = () => {
    const data = React.useContext(startupContext);

    return <ClientHeader data={data} />;
};

export default ClientHeaderContainer;
