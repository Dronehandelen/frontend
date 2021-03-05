import React from 'react';
import { Breadcrumb, BreadcrumbItem, Col, Container, Row } from 'reactstrap';
import ProductWithFiltersContainer from '../../components/ProductWithFilters/ProductWithFiltersContainer.jsx';
import Helmet from '../../components/Helmet.jsx';
import { Link } from 'react-router-dom';
import appConfig from '../../config/app.js';
import windowHelper from '../../helpers/window.js';

const BrandContainer = ({ brand }) => {
    return (
        <>
            <Helmet title={brand.name}>
                <link
                    rel="canonical"
                    href={`${windowHelper.origin()}/b/${brand.alias}`}
                />
            </Helmet>
            <Container>
                <Row>
                    <Col>
                        <Breadcrumb>
                            <BreadcrumbItem>
                                <Link to="/">{appConfig.appName}</Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem active>{brand.name}</BreadcrumbItem>
                        </Breadcrumb>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <h1>{brand.name}</h1>
                    </Col>
                </Row>
            </Container>
            <ProductWithFiltersContainer
                baseFilters={{ brandIds: [brand.id] }}
                listName={'Brand page'}
            />
        </>
    );
};

export default BrandContainer;
