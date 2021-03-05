import React from 'react';

import getGraphqlError from '../../helpers/getGraphqlError';
import useLoginMutation from '../../graphql/mutations/login';
import Login from './Login';
import AuthContext from '../../contexts/auth.js';
import { useHistory, useLocation } from 'react-router-dom';
import Helmet from '../../components/Helmet';
import tracking from '../../helpers/tracking.js';
import queryString from 'query-string';

const LoginContainer = ({ email, redirect = true, ...props }) => {
    const history = useHistory();
    const location = useLocation();
    const { refetch } = React.useContext(AuthContext);
    const [login, { error, loading }] = useLoginMutation();
    const [values, setValues] = React.useState({
        email: email || '',
        password: '',
    });

    return (
        <>
            <Helmet title="Login" />
            <Login
                {...props}
                loading={loading}
                values={values}
                setValues={setValues}
                error={error && getGraphqlError(error)}
                login={() => {
                    login({
                        variables: values,
                    })
                        .then(() => {
                            tracking.event('authentication', 'login');
                            refetch().then(() => {
                                if (redirect) {
                                    let url = '/';
                                    const query = queryString.parse(
                                        location.search
                                    );

                                    if (query.redirectUrl) {
                                        url = query.redirectUrl;
                                    }

                                    history.push(url);
                                }
                            });
                        })
                        .catch(() => {});
                }}
            />
        </>
    );
};

export default LoginContainer;
