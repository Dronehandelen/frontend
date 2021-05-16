import React from 'react';
import styled from 'styled-components';
import { Col, Container, Row } from 'reactstrap';
import { ProductsView } from '../../components/Products';
import appConfig from '../../config/app.js';
import PageSeparator from '../../components/PageSeparator.jsx';
import { Link } from 'react-router-dom';
import ProductReview from './ProductReview.jsx';

const SeeMore = styled.div`
    font-size: 1rem;
    display: flex;
    align-items: center;

    > a {
        text-decoration: none;
    }

    > a,
    > a:hover {
        color: inherit;
    }
`;

const Home = ({ data }) => {
    return (
        <Container>
            <Row className="mt-4">
                <Col md={9}>
                    <PageSeparator>Utvalgte produkter</PageSeparator>
                    <ProductsView
                        listName="Home - Featured"
                        products={data.highlightedProducts.edges.map(
                            (edge) => edge.node
                        )}
                        lg={4}
                        md={6}
                    />
                </Col>
                <Col md={3}>
                    <PageSeparator>Siste anmeldelser</PageSeparator>
                    {data.lastReviews.map((review) => (
                        <ProductReview key={review.id} review={review} />
                    ))}
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <PageSeparator className="d-flex justify-content-between">
                        <div>Nye produkter</div>
                        <SeeMore>
                            <Link to="/new-products">
                                Se flere <i className="fa fa-arrow-right" />
                            </Link>
                        </SeeMore>
                    </PageSeparator>
                </Col>
            </Row>
            <ProductsView
                listName="Home - New products"
                products={data.newProducts.edges.map((edge) => edge.node)}
            />
            <Row className="mt-4">
                <Col>
                    <PageSeparator>Populært akkurat nå</PageSeparator>
                </Col>
            </Row>
            <ProductsView
                listName="Home - Popular"
                products={data.popularProducts.edges.map((edge) => edge.node)}
            />
            <Row className="mt-4">
                <Col>
                    <PageSeparator>Sosiale medier</PageSeparator>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col className="text-muted" md={8}>
                    <p>
                        Hos {appConfig.appName} får du rask levering og god
                        service!
                    </p>
                    <p>
                        Vi jobber kontinuerlig for å være en nettbutikk med det
                        siste og beste til deg som skal bygge drone eller ønsker
                        å fly FPV.
                    </p>
                </Col>
            </Row>
        </Container>
    );
};

export default Home;
