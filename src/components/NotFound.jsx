import React from 'react';
import styled from 'styled-components';
import { Col, Container, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import Helmet from './Helmet';
import AppContext from '../contexts/app.js';

const Mascot = styled.div`
    img {
        max-width: 100%;
        max-height: 30vh;
    }
`;

const NotFound = () => {
    const { notFoundEvent } = React.useContext(AppContext);

    notFoundEvent();

    return (
        <Container>
            <Helmet title="404">
                <meta name="robots" content="noindex" />
            </Helmet>
            <Row className="justify-content-center">
                <Col className="text-center" md={5}>
                    <Mascot>
                        <img src="/character.png" />
                    </Mascot>
                    <h2>404 Ikke funnet</h2>
                    <p>Forespurt side ble ikke funnet</p>
                    <p>
                        Vi har nettopp lansert nettsiden på nytt igjen og det
                        kan derfor være noe lenke som ikke er gyldig lenger.
                    </p>
                    <Link to="/">Gå til landingssiden</Link>
                </Col>
            </Row>
        </Container>
    );
};

export default NotFound;
