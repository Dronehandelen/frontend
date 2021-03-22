import React from 'react';
import { gql, useMutation } from '@apollo/client';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';

const MUTATION = gql`
    mutation LinkClick($token: String!) {
        linkClick(token: $token)
    }
`;

const DlidContainer = ({ children }) => {
    const location = useLocation();
    const [linkClick] = useMutation(MUTATION);
    const dlidToken = React.useMemo(() => {
        const query = queryString.parse(location.search);
        return query.dlid || null;
    }, [location]);

    React.useEffect(() => {
        if (dlidToken) {
            linkClick({ variables: { token: dlidToken } });
        }
    }, [dlidToken]);

    return children;
};

export default DlidContainer;
