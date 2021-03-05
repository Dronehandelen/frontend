import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Videos from './routes/Videos';
import Articles from './routes/Articles';
import Article from './routes/Articles/routes/Article.jsx';

const Index = ({ match }) => {
    return (
        <Switch>
            <Route exact path={`${match.path}/articles`} component={Articles} />
            <Route
                exact
                path={`${match.path}/articles/:articleId`}
                component={Article}
            />
            <Route exact path={`${match.path}/videos`} component={Videos} />
        </Switch>
    );
};

export default Index;
