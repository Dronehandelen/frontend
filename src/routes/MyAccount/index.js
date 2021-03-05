import React from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';
import Orders from './routes/Orders';
import AuthContext from '../../contexts/auth';
import Home from './routes/Home.jsx';
import ChangePassword from './routes/ChangePassword.jsx';
import MyInfo from './routes/MyInfo.jsx';
import Newsletter from './routes/Newsletter.jsx';
import { Spinner } from 'reactstrap';
import Reward from './routes/Reward';

const Index = (props) => {
    const location = useLocation();
    const { user, isAuthenticated, isAuthenticating } = React.useContext(
        AuthContext
    );

    if (isAuthenticating) {
        return <Spinner />;
    }

    if (!isAuthenticated) {
        return (
            <Redirect
                to={`/login?redirectUrl=${location.pathname + location.search}`}
            />
        );
    }

    if (!user.emailConfirmed) {
        return <Redirect to="/confirm-email" />;
    }

    return (
        <Switch>
            <Route exact path={`${props.match.path}`} component={Home} />
            <Route
                path={`${props.match.path}/change-password`}
                component={ChangePassword}
            />
            <Route path={`${props.match.path}/my-info`} component={MyInfo} />
            <Route
                path={`${props.match.path}/newsletter`}
                component={Newsletter}
            />
            <Route path={`${props.match.path}/orders`} component={Orders} />
            <Route path={`${props.match.path}/reward`} component={Reward} />
        </Switch>
    );
};

export default Index;
