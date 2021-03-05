import React from 'react';
import { Breadcrumb, BreadcrumbItem, Col, Row, Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import appConfig from '../../../config/app.js';
import Helmet from '../../../components/Helmet.jsx';

const PriceMatch = () => {
    return (
        <Container className="mt-1">
            <Helmet title="Prismatch" />
            <Row>
                <Col>
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to="/">{appConfig.appName}</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            <Link to="/customer-support">Kundeservice</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>Prismatch</BreadcrumbItem>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col md={6}>
                    <h1>Prismatch</h1>
                    <p>
                        Vi ønsker å tilby dere markedets beste priser, slik at
                        du kan være sikker på at du gjør et godt kjøp. Vi
                        lanserer derfor prismatch!
                    </p>
                    <p>
                        Finner du en vare hos en norsk konkurrent som er
                        billigere en oss og på lager vil vi matche prisen. Alt
                        du trenger å gjøre er å dokumentere det og å ta kontakt
                        med oss før du gjennomfører kjøpet. Så fort vi har gått
                        gjennom dokumentasjonen vil vi oppdatere prisen på
                        varen.
                    </p>
                    <h3>Vilkår:</h3>
                    <ul>
                        <li>
                            Du må kunne dokumentere at en konkurrent har en
                            lavere pris. Du kan for eksempel sende oss en lenke
                            til siden hvor du fant prisen.
                        </li>
                        <li>
                            Dokumentasjonen må vise at en konkurrents vare er på
                            lager.
                        </li>
                        <li>
                            Prismatch gjelder ikke når våre konkurrenter har
                            salg eller rabatter med unntak av NLF-rabatt hos
                            Elefun
                        </li>
                    </ul>
                </Col>
            </Row>
        </Container>
    );
};

export default PriceMatch;
