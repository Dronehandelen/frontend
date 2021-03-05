import React from 'react';
import { ProductCard, ProductListItem } from '../../../components/Product';
import { Col, Row } from 'reactstrap';
import Card from '../../../components/Card.jsx';
import CustomCardTitle from './CardTitle.jsx';
import tracking from '../../../helpers/tracking.js';

const RelatedProducts = ({ products, listName, title }) => {
    React.useEffect(() => {
        if (products.length !== 0) {
            tracking.productsImpression(products, { listName });
        }
    }, [listName, products]);

    if (products.length === 0) {
        return <></>;
    }

    return (
        <Card>
            <div className="p-3">
                <CustomCardTitle>{title}</CustomCardTitle>
            </div>
            <Row>
                {products.map((relatedProduct, index) => (
                    <Col md={6} className="mb-3" key={relatedProduct.id}>
                        <div className="d-none d-md-flex h-100 w-100 ">
                            <ProductCard
                                key={relatedProduct.id}
                                product={relatedProduct}
                                position={index + 1}
                                listName={listName}
                                imageHeight={100}
                            />
                        </div>
                        <div className="d-flex d-md-none">
                            <ProductListItem
                                key={relatedProduct.id}
                                product={relatedProduct}
                                position={index + 1}
                                listName={listName}
                                compact
                            />
                        </div>
                    </Col>
                ))}
            </Row>
        </Card>
    );
};

export default RelatedProducts;
