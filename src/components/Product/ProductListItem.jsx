import React from 'react';
import cn from 'classnames';
import { getDefaultProductImageUrl, promotion } from '../../helpers/product';
import styled from 'styled-components';
import ProductStars from '../ProductStars';
import formatPrice from '../../helpers/formatPrice';
import augmentProduct from '../../helpers/product.js';
import { Link } from 'react-router-dom';
import tracking from '../../helpers/tracking';
import DiscountBobble from '../DiscountBobble';
import NewBobble from '../NewBobble/NewBobble.jsx';
import { gql } from '@apollo/client';
import BuyButton from '../BuyButton.jsx';
import ProductStockStatus from '../ProductStockStatus.jsx';
import LazyLoad from 'react-lazyload';

const StyledProductListItem = styled(Link)`
    position: relative;
    margin: 10px 0;
    text-decoration: none;
    color: inherit;
    border: 1px solid transparent;
    padding: 5px;
    display: block;
    width: 100%;

    &:hover {
        border: 1px solid #b4b4b4;
        text-decoration: none;
        color: inherit;
    }

    & > .content {
        display: flex;
        max-height: 100%;

        & > *:not(:first-child) {
            flex: 1.5;
        }
    }

    &.compact > .content {
        & > *:not(:first-child) {
            flex: 3;
        }
    }
`;

const ImageWrapper = styled(LazyLoad)`
    flex: 1;
    max-height: 100%;

    & > img {
        max-width: 100%;
        max-height: 100%;
    }
`;

export const productListItemFragment = gql`
    fragment ProductListItemFragment on Product {
        alias
        id
        shortDescription
        originalPrice
        price
        title
        stock
        createdAt
        backorderMessage
        countAvailableForBackorder
        pricing {
            originalPrice
            price
            vipPromotionPrice: promotionPrice(type: "vip") {
                validUntil
                price
            }
            openPromotionPrice: promotionPrice(type: "open") {
                validUntil
                price
            }
        }
        images {
            fileId
            url
        }
        primaryImage {
            fileId
            url
        }
        stars {
            rating
            count
        }
        brand {
            id
            name
        }
    }
`;

const ProductListItem = ({
    product,
    position,
    listName,
    prefix = '',
    compact = false,
    children,
    url = null,
}) => {
    const imageUrl = getDefaultProductImageUrl(product);
    const { hasPromotion, promotionPresent, shopVIP } = promotion(product);
    const augmentedProduct = augmentProduct(product);

    const isSoldOut = product.stock === 0;

    const showDiscountBobble = !isSoldOut && (hasPromotion || shopVIP);

    return (
        <StyledProductListItem
            to={url ? url : `${prefix}/p/${product.alias}`}
            onClick={() =>
                tracking.productClick(product, {
                    position,
                    listName,
                })
            }
            className={cn({
                compact: compact,
            })}
        >
            {showDiscountBobble && (
                <DiscountBobble
                    top={10}
                    present={promotionPresent}
                    small
                    vip={shopVIP}
                />
            )}
            {!showDiscountBobble && augmentedProduct.isNew() && (
                <NewBobble top={10} />
            )}
            <div className="content">
                <ImageWrapper once>
                    <img src={imageUrl} alt={product.title} />
                </ImageWrapper>
                <div className="pl-4 d-flex flex-column justify-content-between">
                    <div>
                        <div>
                            <strong>{product.title}</strong>
                        </div>
                        {product.stars && (
                            <ProductStars stars={product.stars} />
                        )}
                        {!compact && <div>{product.shortDescription}</div>}
                    </div>
                    <div className="mt-1">
                        <ProductStockStatus
                            stock={product.stock}
                            backorderMessage={product.backorderMessage}
                            countAvailableForBackorder={
                                product.countAvailableForBackorder
                            }
                        />
                        <div className="d-flex justify-content-between mt-1">
                            <div>
                                <span style={{ fontSize: '1.2em' }}>
                                    <strong>
                                        {formatPrice(product.price)}
                                    </strong>
                                </span>
                                {hasPromotion && (
                                    <i className="ml-3">
                                        <span>
                                            Før {product.originalPrice},-
                                        </span>
                                    </i>
                                )}
                            </div>
                            {!compact && <BuyButton product={product} />}
                        </div>
                    </div>
                </div>
                {children}
            </div>
        </StyledProductListItem>
    );
};

export default ProductListItem;
