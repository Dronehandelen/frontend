import React from 'react';
import { Breadcrumb, BreadcrumbItem, Col, Container, Row } from 'reactstrap';
import Helmet from '../../../components/Helmet.jsx';
import { Link } from 'react-router-dom';
import appConfig from '../../../config/app.js';

const Shipping = () => {
    return (
        <Container>
            <Helmet title="Frakt" />
            <Row>
                <Col>
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to="/">{appConfig.appName}</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            <Link to="/customer-support">Kundeservice</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>Frakt</BreadcrumbItem>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col md={6}>
                    <h1>Frakt</h1>
                    <p>Det finnes tre fraktmuligheter.</p>
                    <p>
                        <strong>Hente selv</strong>
                    </p>
                    <p>
                        Å hente selv koster ingenting. Du må hente pakken på
                        lageret vårt som er på følgende adresse: Gisløy, 8430
                        Myre
                    </p>
                    <p>
                        <strong>Til butikken i nærheten</strong>
                    </p>
                    <p>
                        "Til butikken i nærheten" koster 149kr. Du får som regel
                        pakken i løpet av 5 arbeidsdager. Her varierer
                        leveringstiden lite.
                    </p>
                    <p>
                        <strong>Pakke i postkassen</strong>
                    </p>
                    <p>
                        "Pakke i postkassen" koster 69kr. Her får du ingen
                        sporing og posten sier at pakken skal leveres i løpet av
                        2 virkedager. Vår erfaring er at det tar i hvertfall 4
                        virkedager. Leveringstidene varierer veldig mye. Vi har
                        opplevd at en pakke kommer frem på 2 virkedager, mens
                        andre ganger tar det 10 virkedager.
                    </p>
                    <p>
                        Du vil ikke alltid få mulighet til å velge pakke i
                        postkassen. Følgende vilkår gjelder:
                    </p>
                    <ul>
                        <li>Maks volum: 3.000.000mm3</li>
                        <li>Maks lengde på en vare: 30cm</li>
                        <li>Maks verdi på bestillingen: 2999kr</li>
                    </ul>
                    <h3>Spørsmål og svar</h3>
                    <p>
                        <strong>Når sendes pakkene?</strong> Alle bestillinger
                        før kl. 06.30 sendes samme dag.
                    </p>
                    <p>
                        <strong>
                            Hvorfor står det "Ingen sending er mottatt ennå, kun
                            melding om dette" på linken jeg fikk?
                        </strong>{' '}
                        Grunnen er at pakken din har blitt sendt som pakke i
                        postkassen og du vil derfor ikke motta noen
                        oppdateringer før pakken har ankommet terminal. Dette
                        tar vanligvis 3 virkedager.
                    </p>
                </Col>
            </Row>
        </Container>
    );
};

export default Shipping;
