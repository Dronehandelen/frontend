import React from 'react';
import DefaultHookQuery from '../../containers/DefaultHookQuery.jsx';
import Product from './Product.jsx';
import CartContext from '../../contexts/cartContext.js';
import Helmet from '../../components/Helmet';
import NotFound from '../../components/NotFound.jsx';
import windowHelper from '../../helpers/window';
import { gql } from '@apollo/client';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { packageProductsFragment } from './components/PackageProducts';
import moment from 'moment';
import { productReviewsFragment } from './Reviews.jsx';
import { productFragment } from '../../components/Product/Product.jsx';

export const getProductQuery = gql`
    query GetProduct($id: Int, $alias: String) {
        product(id: $id, alias: $alias) {
            ...ProductReviews
            ...PackageProduct
            alias
            id
            type
            description
            shortDescription
            expiredAt
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
            countAvailableForBackorder
            backorderMessage
            createdAt
            images {
                fileId
                url
            }
            primaryImage {
                fileId
                url
            }
            brand {
                id
                name
            }
            stars {
                rating
                count
            }
            relatedProducts(count: 4) {
                ...ProductFragment
            }
            relatedByOrderProducts: relatedProducts(
                count: 4
                filters: { byOrderWithProduct: true }
            ) {
                ...ProductFragment
            }
            accessories {
                ...ProductFragment
            }
            canonicalRedirectProduct {
                alias
            }
        }
    }
    ${productReviewsFragment}
    ${packageProductsFragment}
    ${productFragment}
`;

const ProductContainer = ({ productId, productAlias }) => {
    const { addProduct } = React.useContext(CartContext);
    const location = useLocation();

    return (
        <DefaultHookQuery
            queryHookData={useQuery(getProductQuery, {
                variables: {
                    id: productId,
                    alias: productAlias,
                },
                errorPolicy: 'all',
            })}
            handleNotFound
        >
            {({ data, refetch }) => {
                if (!data.product) {
                    return <NotFound />;
                }

                const url = `${windowHelper.origin()}/p/${data.product.alias}`;
                const canonicalUrl = `${windowHelper.origin()}/p/${
                    data.product.canonicalRedirectProduct
                        ? data.product.canonicalRedirectProduct.alias
                        : data.product.alias
                }`;
                let meta = {
                    '@context': 'https://schema.org/',
                    '@type': 'Product',
                    sku: data.product.id,
                    name: data.product.title,
                    url,
                    image: [
                        data.product.primaryImage &&
                            data.product.primaryImage.url,
                    ].filter(Boolean),
                    description: data.product.thirdPartyDescription,
                    brand: {
                        '@type': 'Brand',
                        name: data.product.brand.name,
                    },
                    offers: {
                        '@type': 'Offer',
                        priceCurrency: 'NOK',
                        price: data.product.originalPrice,
                        availability:
                            data.product.stock === 0
                                ? data.product.countAvailableForBackorder === 0
                                    ? 'https://schema.org/OutOfStock'
                                    : 'https://schema.org/PreOrder'
                                : 'https://schema.org/InStock',
                        url,
                        priceValidUntil: moment()
                            .add(1, 'week')
                            .format('YYYY-MM-DD'),
                        itemCondition: 'http://schema.org/NewCondition',
                    },
                };

                if (data.product.stars) {
                    meta.aggregateRating = {
                        '@type': 'AggregateRating',
                        ratingValue: String(data.product.stars.rating),
                        reviewCount: String(data.product.stars.count),
                    };
                }

                if (data.product.gtin) {
                    meta.gtin = data.product.gtin;
                }

                return (
                    <>
                        <Helmet title={data.product.title}>
                            <link rel="canonical" href={canonicalUrl} />
                            <meta
                                property="og:description"
                                content={data.product.thirdPartyDescription}
                            />
                            {data.product.primaryImage && (
                                <meta
                                    property="og:image"
                                    content={data.product.primaryImage.url}
                                />
                            )}
                            <script type="application/ld+json">
                                {JSON.stringify(meta)}
                            </script>
                        </Helmet>
                        <Product
                            product={data.product}
                            addProduct={(amount) =>
                                addProduct(data.product, amount)
                            }
                            refetch={refetch}
                            baseUrl={location.pathname}
                        />
                    </>
                );
            }}
        </DefaultHookQuery>
    );
};

export default ProductContainer;
