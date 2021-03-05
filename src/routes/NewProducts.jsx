import React from 'react';
import { Breadcrumb, BreadcrumbItem, Col, Container, Row } from 'reactstrap';
import Products from '../components/Products';
import { Link, Route, Switch } from 'react-router-dom';
import appConfig from '../config/app.js';
import productContext from '../contexts/product.js';
import Product from './Product';
import NotFound from '../components/NotFound.jsx';
import Helmet from '../components/Helmet.jsx';

const NewProducts = () => {
    return (
        <Container>
            <Helmet title="Nye produkter">
                <meta
                    property="og:description"
                    content="Alle de siste produkter vi har lagt til på nettsiden."
                />
            </Helmet>
            <Row>
                <Col>
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to="/">{appConfig.appName}</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>Nye produkter</BreadcrumbItem>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h1>Nye produkter</h1>
                    <Products
                        orderBy="createdAt"
                        pageSize={24}
                        listName="new_products"
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default ({ match }) => {
    return (
        <productContext.Provider
            value={{
                basePath: `/new-products`,
                extraBreadcrumb: (
                    <>
                        <BreadcrumbItem>
                            <Link to={`/new-products`}>Nye produkter</Link>
                        </BreadcrumbItem>
                    </>
                ),
            }}
        >
            <Switch>
                <Route exact path={match.path} component={NewProducts} />
                <Route
                    path={`${match.path}/products/:productId`}
                    component={Product}
                />
                <Route
                    path={`${match.path}/p/:productAlias`}
                    component={Product}
                />
                <NotFound />
            </Switch>
        </productContext.Provider>
    );
};
