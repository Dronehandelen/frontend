import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import moment from 'moment';
import { Link } from 'react-router-dom';
import tracking from '../helpers/tracking';
import EmailInputRegister from './EmailInputRegister.jsx';
import AuthContext from '../contexts/auth.js';
import appConfig from '../config/app.js';
import FbLike from './FBLike';

const Footer = () => {
    const { isAuthenticated } = React.useContext(AuthContext);
    const onLinkClick = (buttonName) => () => {
        tracking.event('Footer module', `Link "${buttonName}" clicked`);
    };

    return (
        <footer className="page-footer font-small bg-dark text-white mt-5">
            <Container className="text-center text-md-left pt-5 pb-3">
                <Row className="justify-content-center">
                    <Col md={6} className="text-white">
                        Følg oss på{' '}
                        <a
                            href="https://www.facebook.com/dronehandelen"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={onLinkClick('facebook')}
                        >
                            Facebook
                        </a>{' '}
                        for å være oppdatert på det som kommer inn. Hvis det er
                        noe du lurer på kan du sende oss en melding, så svarer
                        vi så fort vi kan.
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col className="d-flex justify-content-center">
                        <FbLike />
                    </Col>
                </Row>
                {!isAuthenticated && (
                    <Row className="text-center mt-4 justify-content-center">
                        <Col
                            md={6}
                            className="d-flex justify-content-center text-white"
                        >
                            <EmailInputRegister />
                        </Col>
                    </Row>
                )}

                <Row>
                    <Col className="text-center mt-4">
                        <ul className="list-unstyled">
                            <li>
                                <Link to="/" onClick={onLinkClick('Hjem')}>
                                    Hjem
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/customer-support"
                                    onClick={onLinkClick('Kundeservice')}
                                >
                                    Kundeservice
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/customer-support/shipping"
                                    onClick={onLinkClick(
                                        'Informasjon om frakt'
                                    )}
                                >
                                    Informasjon om frakt
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/customer-support/refund-policy"
                                    onClick={onLinkClick(
                                        'Retningslinjer for refusjon'
                                    )}
                                >
                                    Retningslinjer for refusjon
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/customer-support/privacy-policy"
                                    onClick={onLinkClick('Personvernerklæring')}
                                >
                                    Personvernerklæring
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/customer-support/order-terms"
                                    onClick={onLinkClick('Salgsbetingelser')}
                                >
                                    Salgsbetingelser
                                </Link>
                            </li>
                        </ul>
                    </Col>
                </Row>
            </Container>
            <div className="footer-copyright text-center pt-3">
                © {moment().year()} Copyright {appConfig.owner.name} (Org.nr:{' '}
                {appConfig.owner.orgnr})
            </div>
            <div
                className="footer-copyright text-center pb-3"
                style={{ marginTop: -5 }}
            >
                <small>
                    <i>Versjon {appConfig.releaseDate}</i>
                </small>
            </div>
        </footer>
    );
};

export default Footer;
