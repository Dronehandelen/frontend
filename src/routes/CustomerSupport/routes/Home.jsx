import React from 'react';
import {
    Breadcrumb,
    BreadcrumbItem,
    Card,
    Col,
    Container,
    Row,
    Table,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import appConfig from '../../../config/app.js';
import styled from 'styled-components';

const StyledLink = styled(Link)`
    margin-bottom: 15px;
`;

const Home = () => {
    const email = (
        <a href={`mailto:${appConfig.supportEmail}`}>
            {appConfig.supportEmail}
        </a>
    );

    return (
        <Container className="mt-1">
            <Row>
                <Col>
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to="/">{appConfig.appName}</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>Kundeservice</BreadcrumbItem>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col md={12}>
                    <h1>Kundeservice</h1>
                </Col>
                <Col md={6}>
                    <Card body>
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
                                <tr>
                                    <td>
                                        <strong>Chat</strong>
                                    </td>
                                    <td>
                                        I nedre høyre på nettsiden kan du trykke
                                        på en boble for å snakke med oss.
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card body>
                        <StyledLink to="/customer-support/price-match">
                            Prismatch
                        </StyledLink>
                        <StyledLink to="/customer-support/refund-policy">
                            Retningslinjer for refusjon
                        </StyledLink>
                        <StyledLink to="/customer-support/order-terms">
                            Salgsbetingelser
                        </StyledLink>
                        <StyledLink to="/customer-support/privacy-policy">
                            Personvernerklæring
                        </StyledLink>
                        <StyledLink to="/customer-support/shipping">
                            Informasjon om frakt
                        </StyledLink>
                        <StyledLink to="/customer-support/reward-terms">
                            Fordelsprogram
                        </StyledLink>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Home;
