import React from 'react';
import ProductWithFiltersContainer from '../../components/ProductWithFilters/ProductWithFiltersContainer.jsx';
import Helmet from '../../components/Helmet.jsx';
import { Breadcrumb, BreadcrumbItem, Col, Container, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import appConfig from '../../config/app.js';
import windowHelper from '../../helpers/window.js';
import tracking from '../../helpers/tracking.js';

const ProductCategoryContainer = ({ category }) => {
    React.useEffect(() => {
        if (category) {
            tracking.categoryEvent(category.id, 'view');
        }
    }, [category]);

    return (
        <>
            <Helmet title={category.name}>
                <link
                    rel="canonical"
                    href={`${windowHelper.origin()}/b/${category.alias}`}
                />
            </Helmet>
            <Container>
                <Row>
                    <Col>
                        <Breadcrumb>
                            <BreadcrumbItem>
                                <Link to="/">{appConfig.appName}</Link>
                            </BreadcrumbItem>
                            {category.parentCategory && (
                                <BreadcrumbItem>
                                    <Link
                                        to={`/c/${category.parentCategory.alias}`}
                                    >
                                        {category.parentCategory.name}
                                    </Link>
                                </BreadcrumbItem>
                            )}
                            <BreadcrumbItem active>
                                {category.name}
                            </BreadcrumbItem>
                        </Breadcrumb>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <h1>{category.name}</h1>
                    </Col>
                </Row>
            </Container>
            <ProductWithFiltersContainer
                baseFilters={{ categoryIds: [category.id] }}
                listName={'Category page'}
            />
        </>
    );
};

export default ProductCategoryContainer;
