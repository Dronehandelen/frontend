import React from 'react';
import CartProduct from './components/CartProduct/CartProduct.jsx';
import { Alert, Button, Col, Container, Row, Spinner, Table } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useWindowSize } from 'moment-hooks';
import sizeConfig from '../../config/size.js';
import tracking from '../../helpers/tracking.js';
import LoadingOverlay from './components/LoadingOverlay.jsx';
import RelatedProducts from './components/RelatedProducts.jsx';
import Card from '../../components/Card.jsx';
import { default as ProductHelper } from '../../helpers/product.js';

const Cart = ({
    cartItems,
    onSetAmount,
    totalPrice,
    toCheckout,
    status,
    loadingCart,
    relatedProducts,
}) => {
    const { t } = useTranslation();
    const { width } = useWindowSize();

    return (
        <Container className="mt-3">
            <Row>
                <Col>
                    <h2>{t('Shopping cart')}</h2>
                </Col>
                <Col className="d-flex justify-content-end">
                    {cartItems.length !== 0 && (
                        <Button
                            size="lg"
                            color="primary"
                            onClick={() => {
                                tracking.event(
                                    'Cart page',
                                    `Button "Til kassen" clicked`
                                );
                                toCheckout();
                            }}
                            disabled={status.loading}
                        >
                            {status.loading ? <Spinner /> : 'Til kassen'}
                        </Button>
                    )}
                </Col>
            </Row>
            <Row className="mt-2">
                <Col className="position-relative">
                    <Table responsive>
                        {width >= sizeConfig.md && (
                            <thead>
                                <tr>
                                    <th />
                                    <th />
                                    <th>Antall</th>
                                    <th className="text-right">Pris</th>
                                    <th className="text-right">Totalt</th>
                                    <th className="text-center">Slett</th>
                                </tr>
                            </thead>
                        )}
                        <tbody>
                            {cartItems.map((cartItem) => {
                                const augmentedProduct = ProductHelper(
                                    cartItem.product
                                );

                                return (
                                    <CartProduct
                                        key={cartItem.product.id}
                                        isMobile={width < sizeConfig.md}
                                        product={cartItem.product}
                                        amount={cartItem.amount}
                                        onSetAmount={(amount) =>
                                            onSetAmount(
                                                cartItem.product.id,
                                                augmentedProduct.totalCountAvailable() >
                                                    amount
                                                    ? amount
                                                    : augmentedProduct.totalCountAvailable()
                                            )
                                        }
                                    />
                                );
                            })}
                        </tbody>
                    </Table>
                    {status.error && (
                        <Alert color="danger">{status.error}</Alert>
                    )}
                    {loadingCart && <LoadingOverlay />}
                </Col>
            </Row>
            <RelatedProducts
                relatedProducts={relatedProducts}
                className="d-none d-lg-block"
            />
            <Row className="mt-4">
                <Col md={8} className="mb-2" />
                <Col md={4}>
                    <div className="mb-2 text-center">
                        <Link
                            to="/customer-support/refund-policy"
                            onClick={() => {
                                tracking.event(
                                    'Cart page',
                                    'Link "Retningslinjer for refusjon" clicked'
                                );
                            }}
                        >
                            Retningslinjer for refusjon
                        </Link>
                    </div>
                    <Card>
                        <div className="text-muted mb-3">
                            Frakt velger du i kassen. Der vil du få valget
                            mellom å hente pakken selv eller levering med
                            posten.
                        </div>
                        <div className="text-center mb-3">
                            <strong>Total sum: {totalPrice},-</strong>
                        </div>
                        {cartItems.length !== 0 && (
                            <Button
                                size="lg"
                                color="primary"
                                onClick={() => {
                                    tracking.event(
                                        'Cart page',
                                        `Button "Til kassen" clicked`
                                    );
                                    toCheckout();
                                }}
                                disabled={status.loading}
                                block
                            >
                                {status.loading ? <Spinner /> : 'Til kassen'}
                            </Button>
                        )}
                    </Card>
                </Col>
            </Row>
            <RelatedProducts
                relatedProducts={relatedProducts}
                className="d-block d-lg-none"
            />
        </Container>
    );
};

export default Cart;
