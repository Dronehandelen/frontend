import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import tracking from '../../helpers/tracking';
import Product from '../Product/Product.jsx';
import LoadMore from './LoadMore.jsx';

const Products = ({
    products,
    listName,
    loadMore,
    loadingMore,
    children,
    sm = 6,
    md = 4,
    lg = 3,
}) => {
    React.useEffect(() => {
        tracking.productsImpression(products, { listName });
    }, [listName, products]);

    if (children) {
        return children({
            products,
        });
    }

    return (
        <Container>
            <Row>
                {products.length === 0 && (
                    <Col>
                        <strong>Ingen resultater</strong>
                    </Col>
                )}
            </Row>
            <Row>
                {products.map((product, index) => (
                    <Col sm={sm} md={md} lg={lg} key={product.id}>
                        <Product
                            product={product}
                            listName={listName}
                            position={index + 1}
                        />
                    </Col>
                ))}
            </Row>
            {loadMore && (
                <Row>
                    <Col className="d-flex justify-content-center">
                        <LoadMore
                            loadMore={loadMore}
                            loadingMore={loadingMore}
                        />
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default Products;
