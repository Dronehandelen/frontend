import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import Helmet from '../components/Helmet';
import ProductWithFiltersContainer from '../components/ProductWithFilters/ProductWithFiltersContainer.jsx';

const Offers = () => {
    return (
        <Container>
            <Helmet title={'Tilbud'}>
                <meta
                    property="og:description"
                    content="Alle de siste tilbud fra oss. Lag deg bruker for å motta alle de siste tilbud på e-post."
                />
            </Helmet>
            <Row>
                <Col>
                    <h1>Tilbud</h1>
                </Col>
            </Row>
            <Row>
                <ProductWithFiltersContainer
                    baseFilters={{ listOffersOnly: true, onlyInStock: true }}
                    listName={'Offer page'}
                />
            </Row>
        </Container>
    );
};

export default Offers;
