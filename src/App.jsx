import React from 'react';
import 'isomorphic-fetch';
import moment from 'moment';
import * as Sentry from '@sentry/react';
import { Intercom, LiveChatLoaderProvider } from 'react-live-chat-loader';

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
import DlidContainer from './containers/DlidCatcher';
import StartupContainer from './containers/StartupContainer';

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
    acceptedCookies = () => null,
}) => (
    <Sentry.ErrorBoundary showDialog fallback={FallbackComponent}>
        <StartupContainer>
            <AppContext.Provider
                value={{
                    getNow,
                    cookies,
                    notFoundEvent,
                    acceptedCookies,
                }}
            >
                <DlidContainer>
                    <ScrollToTop>
                        <AuthProvider>
                            <CartProvider>
                                <LiveChatLoaderProvider
                                    providerKey="sliqb0sr"
                                    provider="intercom"
                                >
                                    <Routes />
                                    <Intercom color="#0377BD" />
                                </LiveChatLoaderProvider>
                            </CartProvider>
                        </AuthProvider>
                    </ScrollToTop>
                </DlidContainer>
            </AppContext.Provider>
        </StartupContainer>
    </Sentry.ErrorBoundary>
);

export default App;
