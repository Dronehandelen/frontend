import React from 'react';
import { gql } from '@apollo/client';
import { useLocation } from 'react-router-dom';
import { ProductListItem } from '../../../components/Product';
import { productListItemFragment } from '../../../components/Product/ProductListItem';

export const packageProductsFragment = gql`
    fragment PackageProduct on Product {
        packageProducts {
            amount
            packageProduct {
                ...ProductListItemFragment
            }
        }
    }
    ${productListItemFragment}
`;

const PackageProducts = ({ packageProducts }) => {
    const location = useLocation();

    return (
        <>
            <div>
                <strong>Pakken inneholder følgende produkter</strong>
            </div>
            {packageProducts.map((product, index) => (
                <div key={index} className="d-flex">
                    <ProductListItem
                        product={product.packageProduct}
                        compact
                        url={`${location.pathname}/pp/${product.packageProduct.alias}`}
                    >
                        <div className="d-flex justify-content-center align-items-center">
                            {product.amount} stk
                        </div>
                    </ProductListItem>
                </div>
            ))}
        </>
    );
};

export default PackageProducts;
