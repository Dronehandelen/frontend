import React from 'react';
import styled from 'styled-components';
import { Route, Switch, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Helmet from '../components/Helmet';
import Login from './Login';
import Register from './Register';
import ConfirmEmail from './ConfirmEmail';
import Home from './Home';
import Cart from './Cart';
import Checkout from './Checkout';
import CheckoutDone from './CheckoutDone.jsx';
import Product from './Product';
import MyAccount from './MyAccount';
import ProductCategory from './ProductCategory';
import Footer from '../components/Footer';
import PrivacyPolicy from './CustomerSupport/routes/PrivacyPolicy.jsx';
import CookieConsent from '../components/CookieConsent.jsx';
import AboutUs from './AboutUs.jsx';
import NotFound from '../components/NotFound.jsx';
import RefundPolicy from './CustomerSupport/routes/RefundPolicy.jsx';
import Search from './Search';
import Offers from './Offers.jsx';
import windowHelper from '../helpers/window';
import Wishes from './Wishes.jsx';
import RequestPasswordRequest from './RequestPasswordRequest.jsx';
import ResetPassword from './ResetPassword.jsx';
import OrderTerms from './CustomerSupport/routes/Terms.jsx';
import Brand from './Brand';
import Community from './Community';
import NewProducts from './NewProducts.jsx';
import Shipping from './CustomerSupport/routes/Shipping.jsx';
import VippsCallback from './Checkout/routes/VippsCallback.jsx';
import RewardPolicy from './CustomerSupport/routes/RewardPolicy.jsx';
import CustomerSupport from './CustomerSupport';

const Content = styled.div`
    min-height: 90vh;
`;

const Routes = () => {
    const location = useLocation();

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <link
                    rel="canonical"
                    href={`${windowHelper.origin()}${location.pathname}`}
                />
                <meta
                    property="og:url"
                    content={`${windowHelper.origin()}${location.pathname}`}
                />
                <meta property="og:type" content="website" />
                <meta
                    property="og:image"
                    content={`${windowHelper.origin()}/logo_banner.jpg`}
                />
                <meta property="fb:app_id" content="2011852605625604" />
            </Helmet>
            <Content>
                <Switch>
                    <Route exact path="/checkout" component={() => <></>} />
                    <Header />
                </Switch>
                <Switch>
                    <Route
                        path="/customer-support"
                        component={CustomerSupport}
                    />
                    <Route path="/new-products" component={NewProducts} />
                    <Route path="/my-account" component={MyAccount} />
                    <Route path="/community" component={Community} />
                    <Route exact path="/about" component={AboutUs} />
                    <Route exact path="/wishes" component={Wishes} />
                    <Route exact path="/shipping" component={Shipping} />
                    <Route
                        exact
                        path="/privacy-policy"
                        component={PrivacyPolicy}
                    />
                    <Route
                        exact
                        path="/reward-terms"
                        component={RewardPolicy}
                    />
                    <Route exact path="/order-terms" component={OrderTerms} />
                    <Route
                        exact
                        path="/refund-policy"
                        component={RefundPolicy}
                    />
                    <Route exact path="/search" component={Search} />
                    <Route exact path="/" component={Home} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route
                        exact
                        path="/reset-password-request"
                        component={RequestPasswordRequest}
                    />
                    <Route
                        exact
                        path="/reset-password"
                        component={ResetPassword}
                    />
                    <Route exact path="/cart" component={Cart} />
                    <Route exact path="/checkout" component={Checkout} />
                    <Route
                        exact
                        path="/checkout/vipps-callback"
                        component={VippsCallback}
                    />
                    <Route
                        exact
                        path="/checkout-done"
                        component={CheckoutDone}
                    />
                    <Route
                        exact
                        path="/confirm-email"
                        component={ConfirmEmail}
                    />
                    <Route path="/products/:productId" component={Product} />
                    <Route path="/p/:productAlias" component={Product} />
                    <Route
                        path="/categories/:categoryId"
                        component={ProductCategory}
                    />
                    <Route
                        path="/c/:categoryAlias"
                        component={ProductCategory}
                    />
                    <Route path="/brands/:brandId" component={Brand} />
                    <Route path="/b/:brandAlias" component={Brand} />
                    <Route exact path="/offers" component={Offers} />
                    <NotFound />
                </Switch>
            </Content>
            <Switch>
                <Route path="/checkout" component={() => <></>} />
                <Footer />
            </Switch>
            <CookieConsent />
        </>
    );
};

export default Routes;
