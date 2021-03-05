import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';
import { Spinner } from 'reactstrap';
import configContext from '../contexts/config.js';

const QUERY = gql`
    {
        config {
            reward {
                vipPointsLast12Months
                reviewPoints
                vipFreeShippingAfterAmount
                dailyVisitPoints
            }
        }
    }
`;

const ConfigContainer = ({ children }) => {
    const { error, loading, data } = useQuery(QUERY, {
        errorPolicy: 'all',
    });

    if (error) {
        return <div>Noe skjedde</div>;
    }

    if (loading) {
        return <Spinner />;
    }

    return (
        <configContext.Provider value={data.config}>
            {children}
        </configContext.Provider>
    );
};

export default ConfigContainer;
