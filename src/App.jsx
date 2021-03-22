import React from 'react';
import 'isomorphic-fetch';
import { FacebookProvider } from 'react-facebook';
import moment from 'moment';
import * as Sentry from '@sentry/react';

import Routes from './routes';
import AuthProvider from './containers/AuthProvider';
import CartProvider from './containers/CartProvider';
import AppContext from './contexts/app.js';

import './i18n';
import './index.scss';
import 'font-awesome/css/font-awesome.min.css';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import ScrollToTop from './components/ScrollToTop.jsx';
import { Col, Container, Row } from 'reactstrap';
import ConfigContainer from './containers/ConfigContainer.jsx';
import DlidContainer from './containers/DlidCatcher';

const FallbackComponent = () => (
    <Container>
        <Row>
            <Col className="text-center mt-5" md={{ size: 6, offset: 3 }}>
                <h1>Noe skjedde</h1>
                <p>Noe skjedde når vi lastet inn siden.</p>
            </Col>
        </Row>
    </Container>
);

const App = ({
    getNow = () => moment(),
    cookies,
    notFoundEvent = () => {},
}) => (
    <Sentry.ErrorBoundary showDialog fallback={FallbackComponent}>
        <ConfigContainer>
            <AppContext.Provider
                value={{
                    getNow,
                    cookies,
                    notFoundEvent,
                }}
            >
                <DlidContainer>
                    <FacebookProvider appId={2011852605625604}>
                        <ScrollToTop>
                            <AuthProvider>
                                <CartProvider>
                                    <Routes />
                                </CartProvider>
                            </AuthProvider>
                        </ScrollToTop>
                    </FacebookProvider>
                </DlidContainer>
            </AppContext.Provider>
        </ConfigContainer>
    </Sentry.ErrorBoundary>
);

export default App;
