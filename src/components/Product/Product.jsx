import React from 'react';
import ProductCard from './ProductCard';
import ProductListItem from './ProductListItem';
import { productListItemFragment } from './ProductListItem';
import { productCardFragment } from './ProductCard';
import productContext from '../../contexts/product.js';
import gql from 'graphql-tag';

export const productFragment = gql`
    fragment ProductFragment on Product {
        ...ProductCardFragment
        ...ProductListItemFragment
    }
    ${productListItemFragment}
    ${productCardFragment}
`;

const Product = ({ product, listName, position }) => {
    const { basePath } = React.useContext(productContext);
    const prefix = basePath || '';

    return (
        <>
            <div className="d-none d-md-flex h-100 w-100">
                <ProductCard
                    product={product}
                    listName={listName}
                    position={position}
                    prefix={prefix}
                />
            </div>
            <div className="d-flex d-md-none">
                <ProductListItem
                    product={product}
                    listName={listName}
                    position={position}
                    prefix={prefix}
                />
            </div>
        </>
    );
};

export default Product;
