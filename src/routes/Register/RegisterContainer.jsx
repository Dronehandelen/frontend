import React from 'react';

import getGraphqlError from '../../helpers/getGraphqlError';
import useRegisterMutation from '../../graphql/mutations/register';
import Register from './Register';
import Helmet from '../../components/Helmet';
import tracking from '../../helpers/tracking.js';

const ClientsContainer = ({
    formOnly = false,
    prefilledEmail = '',
    ...props
}) => {
    const [register, { error, loading }] = useRegisterMutation();
    const [values, setValues] = React.useState({
        email: null,
        password: '',
        firstName: '',
        lastName: '',
        newsletter: false,
    });

    const actualValues = {
        ...values,
        email: values.email || prefilledEmail,
    };

    return (
        <>
            {!formOnly && <Helmet title="Lag ny bruker" />}
            <Register
                {...props}
                formOnly={formOnly}
                loading={loading}
                values={actualValues}
                setValues={setValues}
                error={error && getGraphqlError(error)}
                register={() => {
                    register({
                        variables: actualValues,
                    })
                        .then(() => {
                            tracking.register();
                            window.location.replace('/confirm-email');
                        })
                        .catch(() => {});
                }}
            />
        </>
    );
};

export default ClientsContainer;
