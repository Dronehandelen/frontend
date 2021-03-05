import React from 'react';
import { Breadcrumb, BreadcrumbItem, Col, Container, Row } from 'reactstrap';
import Helmet from '../../../components/Helmet.jsx';
import { Link } from 'react-router-dom';
import appConfig from '../../../config/app.js';

const RewardPolicy = () => {
    return (
        <Container>
            <Helmet title="Informasjon om fordelsprogrammet" />
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
                            Informasjon om fordelsprogrammet
                        </BreadcrumbItem>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col md={6}>
                    <h1>Fordelsprogram</h1>
                    <p>
                        <strong>Betingelser:</strong>
                    </p>
                    <ol>
                        <li>
                            Fordelene er kun tilgjengelig for registrerte
                            brukere
                        </li>
                        <li>
                            Tilbudene må kun brukes på varer for personlig bruk.
                        </li>
                        <li>Vi kan når som helst fjerne en konto.</li>
                        <li>Vi kan endre fordelene når som helst.</li>
                        <li>
                            Betingelsene kan endres, mens ved større endringer
                            vil medlemmene varsles på e-post.
                        </li>
                    </ol>
                </Col>
            </Row>
        </Container>
    );
};

export default RewardPolicy;
