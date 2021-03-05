import React from 'react';
import { Col, Container, Row, Table } from 'reactstrap';
import Helmet from '../components/Helmet';
import appConfig from '../config/app.js';
import tracking from '../helpers/tracking.js';

const AboutUs = () => {
    const onLinkClick = (buttonName) => () => {
        tracking.event('About us page', `Link "${buttonName}" clicked`);
    };

    const email = (
        <a
            href={`mailto:${appConfig.supportEmail}`}
            onClick={onLinkClick('email')}
        >
            {appConfig.supportEmail}
        </a>
    );

    return (
        <Container>
            <Helmet title="Om oss" />
            <Row className="justify-content-center">
                <Col md={8}>
                    <h2>Kontakt oss</h2>
                    <Table borderless>
                        <tbody>
                            <tr>
                                <td>
                                    <strong>Facebook</strong>
                                </td>
                                <td>
                                    <a
                                        href={appConfig.social.facebook}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={onLinkClick('facebook')}
                                    >
                                        {appConfig.social.facebook}
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <strong>E-Post</strong>
                                </td>
                                <td>{email}</td>
                            </tr>
                            <tr>
                                <td>
                                    <strong>Besøksadresse</strong>
                                </td>
                                <td>
                                    <div>Gisløy</div>
                                    <div>8430 Myre</div>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                    <h2>Om oss</h2>
                    <p>
                        Nettsiden ble først lansert i februar 2020 under navnet
                        norfpv og vi har siden da kjøpt opp dronehandelen
                        navnet. Vi ønsker å være en nettbutikk med det siste og
                        beste til deg som skal bygge og fly drone.
                    </p>
                    <p>
                        Ta gjerne kontakt med oss om du lurer på noe så hjelper
                        vi deg. Det kan du gjerne ved å bruke chat-funksjonen på
                        nettsiden nederst til høyre.
                    </p>
                </Col>
            </Row>
        </Container>
    );
};

export default AboutUs;
