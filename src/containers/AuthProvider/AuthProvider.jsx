import React from 'react';
import * as Sentry from '@sentry/react';

import AuthContext from '../../contexts/auth';
import tracking from '../../helpers/tracking.js';
import appConfig from '../../config/app.js';

const AuthProvider = ({
    loading,
    data,
    children,
    refetch,
    logout,
    isLoggedOut,
}) => {
    const user =
        !isLoggedOut && data && data.auth && data.auth.user
            ? data.auth.user
            : null;

    React.useEffect(() => {
        if (user) {
            console.log(
                `Setting user with sentry. id: ${user.id}, email: ${user.email}`
            );
            Sentry.configureScope((scope) => {
                scope.setUser({
                    id: user.id,
                    email: user.email,
                });
            });
            tracking.authenticated(user);

            if (!appConfig.isServerSide && window.Tawk_API) {
                const setAttributes = () => {
                    window.Tawk_API.setAttributes(
                        {
                            name: `${user.firstName} ${user.lastName}`,
                            email: user.email,
                            hash: user.tawkToHash,
                        },
                        () => {}
                    );
                };
                if (window.Tawk_API.setAttributes) {
                    setAttributes();
                } else {
                    window.Tawk_API.onLoad = function () {
                        setAttributes();
                    };
                }
            }
        }
    }, [user]);

    React.useEffect(() => {
        if (!user || appConfig.isServerSide) {
            return;
        }
        let count = 0;

        const interval = setInterval(() => {
            count = count + 1;

            if (window.Intercom) {
                window.Intercom('update', {
                    user_id: user.id,
                    name: `${user.firstName} ${user.lastName}`,
                    phone: user.phone,
                    email: user.email,
                    user_hash: user.intercomHash,
                });

                clearInterval(interval);
            }
            if (count > 20) {
                clearInterval(interval);
            }
        }, 100);

        return () => clearInterval(interval);
    }, [user]);

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated: !!user,
                isAuthenticating: !isLoggedOut && loading,
                isAdmin: user && user.isAdmin,
                user,
                refetch,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
