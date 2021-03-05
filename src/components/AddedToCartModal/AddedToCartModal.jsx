import React from 'react';
import SuccessCheck from '../SuccessCheck.jsx';
import styled from 'styled-components';
import { getDefaultProductImageUrl } from '../../helpers/product.js';
import formatPrice from '../../helpers/formatPrice.js';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { ProductCard } from '../Product/index.js';
import Carousel from './Carousel.jsx';

const CloseWrapper = styled.div`
    cursor: pointer;
    padding: 5px 15px 0 0;
`;

const ImageWrapper = styled.div`
    max-height: 100%;
    max-width: 200px;

    & > img {
        max-width: 100%;
        max-height: 100%;
    }
`;

const Product = styled.div`
    display: flex;

    .title {
        flex: 1;
    }

    .price {
        font-size: 1.3rem;
    }
`;

const AddedToCartModal = ({ onClose, product, productVisibleInCarousel }) => {
    return (
        <>
            <div className="d-flex justify-content-between">
                <div style={{ width: 50 }} />
                <div className="text-center">
                    <div>
                        <SuccessCheck sizeRem={1.4} />
                    </div>
                    <div className="pt-2" style={{ fontSize: '1.7rem' }}>
                        Lagt til handlevogn
                    </div>
                </div>
                <div style={{ width: 50 }}>
                    <CloseWrapper onClick={() => onClose()}>
                        <i className="fa fa-times-circle fa-2x" />
                    </CloseWrapper>
                </div>
            </div>
            <Product>
                <ImageWrapper>
                    <img
                        src={getDefaultProductImageUrl(product)}
                        alt={product.title}
                    />
                </ImageWrapper>
                <div className="title d-flex flex-column justify-content-center p-3 ml-2">
                    {product.title}
                </div>
                <div className="price d-flex flex-column justify-content-center p-3 text-right mr-4">
                    {formatPrice(product.price)}
                </div>
            </Product>
            <div className="d-flex pt-5 pb-4">
                <div
                    className="text-center p-1"
                    style={{ flex: 1, minWidth: 0 }}
                >
                    <Button
                        size="lg"
                        color="secondary"
                        className="px-4"
                        onClick={onClose}
                        style={{
                            maxWidth: '100%',
                            width: 300,
                        }}
                    >
                        Fortsett å handle
                    </Button>
                </div>
                <div
                    className="text-center p-1"
                    style={{ flex: 1, minWidth: 0 }}
                >
                    <Button
                        size="lg"
                        color="primary"
                        tag={Link}
                        to="/cart"
                        style={{
                            maxWidth: '100%',
                            width: 300,
                        }}
                    >
                        Gå til handlevogn
                    </Button>
                </div>
            </div>
            <div className="p-3">
                {product.accessories.length !== 0 && (
                    <>
                        <p className="text-center">
                            <strong>Tilbehør</strong>
                        </p>
                        <Carousel visibleItems={productVisibleInCarousel}>
                            {product.accessories.map((product, index) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />
                            ))}
                        </Carousel>
                    </>
                )}
                {product.accessories.length === 0 &&
                    product.relatedProducts.length !== 0 && (
                        <>
                            <p className="text-center">
                                <strong>Andre kjøpte også</strong>
                            </p>
                            <Carousel visibleItems={productVisibleInCarousel}>
                                {product.relatedProducts.map(
                                    (product, index) => (
                                        <ProductCard
                                            key={product.id}
                                            product={product}
                                        />
                                    )
                                )}
                            </Carousel>
                        </>
                    )}
            </div>
        </>
    );
};

export default AddedToCartModal;
