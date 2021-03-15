import React from 'react';
import cn from 'classnames';
import LazyLoad from 'react-lazyload';
import styles from './product.module.scss';
import { Link } from 'react-router-dom';
import augmentProduct, { promotion } from '../../../helpers/product.js';
import tracking from '../../../helpers/tracking.js';
import ProductStars from '../../ProductStars.jsx';
import DiscountBobble from '../../DiscountBobble/DiscountBobble.jsx';
import NewBobble from '../../NewBobble/NewBobble.jsx';
import Image from './Image.jsx';
import BuyButton from '../../BuyButton.jsx';
import ProductStockStatus from '../../ProductStockStatus.jsx';
import { gql } from '@apollo/client';

export const productCardFragment = gql`
    fragment ProductCardFragment on Product {
        alias
        id
        shortDescription
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
        originalPrice
        price
        title
        stock
        createdAt
        backorderMessage
        countAvailableForBackorder
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

const ProductCard = ({
    product,
    position = null,
    listName = null,
    prefix = '',
    imageHeight = 200,
}) => {
    const { hasPromotion, promotionPresent, shopVIP } = promotion(product);
    const augmentedProduct = augmentProduct(product);

    const isSoldOut = product.stock === 0;

    const showDiscountBobble = !isSoldOut && (hasPromotion || shopVIP);

    return (
        <Link
            className={cn(styles.productCard, 'position-relative')}
            to={`${prefix}/p/${product.alias}`}
            onClick={() =>
                tracking.productClick(product, {
                    position,
                    listName,
                })
            }
        >
            {showDiscountBobble && (
                <DiscountBobble
                    top={10}
                    present={promotionPresent}
                    vip={shopVIP}
                />
            )}
            {!showDiscountBobble && augmentedProduct.isNew() && <NewBobble />}
            <LazyLoad height={imageHeight} once>
                <Image product={product} imageHeight={imageHeight} />
            </LazyLoad>
            <div className="flex-grow-1">
                <div className="mt-2">
                    <strong>{product.title}</strong>
                </div>
                <div>{product.shortDescription}</div>
                {product.stars && <ProductStars stars={product.stars} />}
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
                    <div className="d-flex justify-content-center flex-column">
                        <div>
                            {hasPromotion && (
                                <div className={styles.beforePrice}>
                                    Før {product.originalPrice},-
                                </div>
                            )}
                            <div>
                                {hasPromotion && 'Nå'}{' '}
                                <strong className={styles.price}>
                                    {product.price},-
                                </strong>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-end flex-column">
                        <BuyButton product={product} />
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
