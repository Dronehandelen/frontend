import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './routes/Home';
import Article from './routes/Article.jsx';

const Index = ({ match }) => {
    return (
        <Switch>
            <Route exact path={match.path} component={Home} />
            <Route
                exact
                path={`${match.path}/:articleId`}
                component={Article}
            />
        </Switch>
    );
};

export default Index;
