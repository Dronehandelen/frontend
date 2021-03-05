import React from 'react';
import { Breadcrumb, BreadcrumbItem, Col, Container, Row } from 'reactstrap';
import Helmet from '../../../components/Helmet.jsx';
import appConfig from '../../../config/app.js';
import { Link } from 'react-router-dom';

const AboutUs = () => {
    return (
        <Container>
            <Helmet title="Retningslinjer for refusjon" />
            <Row>
                <Col>
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to="/">{appConfig.appName}</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            <Link to="/customer-support">Kundeservice</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>
                            Retningslinjer for refusjon
                        </BreadcrumbItem>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col md={6}>
                    <h1>Retningslinjer for refusjon</h1>
                    <p>
                        Som norsk kjøper har du 14 dagers angrerett på alle dine
                        kjøp. Perioden på 14 dager starter når du har mottatt
                        varen.
                    </p>
                    <p>
                        {appConfig.appName} tilbyr ingen andre refusjon utover
                        de 14 dager som norske loven pålegger oss å ha.
                    </p>
                    <h3>Hvordan?</h3>
                    <p>
                        Du må fylle ut{' '}
                        <a
                            href="https://signform.no/dss/component/signform/?task=form.downloadFile&id=6174"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            dette skjemaet
                        </a>{' '}
                        og sende det til{' '}
                        <a href={`mailto:${appConfig.supportEmail}`}>
                            {appConfig.supportEmail}
                        </a>
                        . Når det er gjort så må varen sendes tilbake til:
                    </p>
                    <div>Max Moeschinger</div>
                    <div>Gisløy</div>
                    <div>8430 Myre</div>
                    <p className="mt-3">
                        Du må selv betale frakt for returen av varen. Når vi har
                        fått varen vil det gå 5-10 dager til du har fått pengene
                        tilbake på kontoen din.
                    </p>
                </Col>
            </Row>
        </Container>
    );
};

export default AboutUs;
