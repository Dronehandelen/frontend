import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './routes/Home';
import Order from './routes/Order';

const Index = (props) => (
    <Switch>
        <Route exact path={props.match.path} component={Home} />
        <Route exact path={`${props.match.path}/:orderId`} component={Order} />
    </Switch>
);

export default Index;
