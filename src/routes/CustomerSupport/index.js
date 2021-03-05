import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './routes/Home.jsx';
import RefundPolicy from './routes/RefundPolicy.jsx';
import PriceMatch from './routes/PriceMatch.jsx';
import Terms from './routes/Terms.jsx';
import PrivacyPolicy from './routes/PrivacyPolicy.jsx';
import Shipping from './routes/Shipping.jsx';
import RewardPolicy from './routes/RewardPolicy.jsx';

const Index = ({ match }) => {
    return (
        <Switch>
            <Route exact path={`${match.path}`} component={Home} />
            <Route
                exact
                path={`${match.path}/refund-policy`}
                component={RefundPolicy}
            />
            <Route
                exact
                path={`${match.path}/price-match`}
                component={PriceMatch}
            />
            <Route exact path={`${match.path}/order-terms`} component={Terms} />
            <Route
                exact
                path={`${match.path}/privacy-policy`}
                component={PrivacyPolicy}
            />
            <Route exact path={`${match.path}/shipping`} component={Shipping} />
            <Route
                exact
                path={`${match.path}/reward-terms`}
                component={RewardPolicy}
            />
        </Switch>
    );
};

export default Index;
