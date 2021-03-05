import React from 'react';
import ProductWishes from '../components/ProductWishes';
import {
    Breadcrumb,
    BreadcrumbItem,
    Card,
    CardBody,
    CardHeader,
    Col,
    Container,
    ListGroup,
    ListGroupItem,
    Row,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import appConfig from '../config/app.js';
import ProductsContainer from '../components/Products/ProductsContainer.jsx';
import styled from 'styled-components';
import date from '../helpers/date.js';
import Helmet from '../components/Helmet.jsx';

const Product = styled(ListGroupItem)`
    cursor: pointer;
    text-decoration: none;
    color: inherit;

    :hover {
        text-decoration: none;
        color: inherit;
        background-color: rgba(0, 0, 0, 0.2);
    }
`;

const Wishes = () => {
    return (
        <>
            <Helmet title="Produktønsker" />
            <Container>
                <Row>
                    <Col>
                        <Breadcrumb>
                            <BreadcrumbItem>
                                <Link to="/">{appConfig.appName}</Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem>
                                <Link to="/">Hjem</Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem active>
                                Produktønsker
                            </BreadcrumbItem>
                        </Breadcrumb>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h1>Produktønsker</h1>
                    </Col>
                </Row>
                <Row>
                    <Col lg={8}>
                        <ProductWishes fullscreen />
                    </Col>
                    <Col lg={4}>
                        <Card>
                            <CardHeader>
                                Ønsker som har blitt lagt til
                            </CardHeader>
                            <CardBody>
                                <ProductsContainer
                                    listName="product_fulfilled_wishes"
                                    pagination={false}
                                    pageSize={10}
                                    orderBy="id"
                                    onlyWished
                                >
                                    {({ products }) => {
                                        return (
                                            <ListGroup>
                                                {products.map((product) => (
                                                    <Product
                                                        key={product.id}
                                                        tag={Link}
                                                        to={`/products/${product.id}`}
                                                    >
                                                        <div>
                                                            {product.title}
                                                        </div>
                                                        <div className="text-muted">
                                                            <small>
                                                                {date.niceDateTime(
                                                                    product.createdAt
                                                                )}
                                                            </small>
                                                        </div>
                                                    </Product>
                                                ))}
                                            </ListGroup>
                                        );
                                    }}
                                </ProductsContainer>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Wishes;
