import React from 'react';
import queryString from 'query-string';

import ConfirmEmail from './ConfirmEmail';

import useConfirmEmailMutation from '../../graphql/mutations/confirmEmail.js';
import useNewConfirmEmailMutation from '../../graphql/mutations/newConfirmEmail.js';
import tracking from '../../helpers/tracking.js';

const ConfirmEmailContainer = () => {
    const [confirmEmail] = useConfirmEmailMutation();
    const [newConfirmEmail] = useNewConfirmEmailMutation();
    const [status, setStatus] = React.useState({
        error: false,
        loading: false,
        hasToken: false,
    });

    const [newConfirmEmailStatus, setNewConfirmEmailStatus] = React.useState({
        error: false,
        loading: false,
        success: false,
    });

    React.useEffect(() => {
        const query = queryString.parse(location.search); //eslint-disable-line

        if (query.token) {
            setStatus({
                error: false,
                loading: true,
                hasToken: true,
            });

            confirmEmail({
                variables: {
                    token: query.token,
                },
            })
                .then(() => {
                    tracking.event('authentication', 'email confirmed');
                    window.location.replace('/my-account');
                })
                .catch(() => {
                    setStatus({
                        error: true,
                        loading: false,
                        hasToken: true,
                    });
                });
        }
    }, [confirmEmail]);

    return (
        <ConfirmEmail
            hasToken={status.hasToken}
            loading={status.loading}
            error={status.error}
            newConfirmEmailStatus={newConfirmEmailStatus}
            onNew={() => {
                setNewConfirmEmailStatus({
                    error: false,
                    success: false,
                    loading: true,
                });

                newConfirmEmail()
                    .then(() =>
                        setNewConfirmEmailStatus({
                            error: false,
                            success: true,
                            loading: false,
                        })
                    )
                    .catch(() => {
                        setNewConfirmEmailStatus({
                            error: true,
                            success: false,
                            loading: false,
                        });
                    });
            }}
        />
    );
};

export default ConfirmEmailContainer;
