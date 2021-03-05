import React from 'react';
import cn from 'classnames';
import { Col, Row } from 'reactstrap';
import Product from '../../../components/Product/Product.jsx';
import Card from '../../../components/Card.jsx';

const RelatedProducts = ({ className, relatedProducts = [] }) => {
    if (relatedProducts.length === 0) {
        return <></>;
    }

    return (
        <Row className={cn('mt-4', className)}>
            <Col>
                <Card>
                    <div>
                        <strong>Populære produkter</strong>
                    </div>
                    <Row className="mt-2">
                        {relatedProducts
                            .filter(({ stock }) => stock !== 0)
                            .filter((_, index) => index < 4)
                            .map((relatedProduct) => {
                                return (
                                    <Col key={relatedProduct.id} md={3}>
                                        <Product
                                            key={relatedProduct.id}
                                            product={relatedProduct}
                                            imageHeight={100}
                                        />
                                    </Col>
                                );
                            })}
                    </Row>
                </Card>
            </Col>
        </Row>
    );
};

export default RelatedProducts;
