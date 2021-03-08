import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import formatPrice from '../../helpers/formatPrice.js';
import { gql } from '@apollo/client';

const Product = styled(Link)`
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    text-decoration: none;
    color: inherit;
    padding: 5px;

    &:hover {
        text-decoration: none;
        color: inherit;
        background-color: rgba(0, 0, 0, 0.05);
    }

    .imageWrapper {
        width: 50px;

        & > img {
            max-width: 100%;
            max-height: 50px;
        }
    }

    .title {
        flex: 1;
    }

    .title,
    .price {
        font-size: 1em;
        padding: 0 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
`;

export const compactListProductFragment = gql`
    fragment CompactListProductFragment on Product {
        alias
        id
        shortDescription
        price
        title
        primaryImage {
            fileId
            url
        }
        stars {
            rating
            count
        }
    }
`;

const CompactListProduct = ({ product }) => {
    return (
        <Product key={product.id} to={'/p/' + product.alias}>
            <div className="imageWrapper">
                <img src={product.primaryImage.url} />
            </div>
            <div className="title">{product.title}</div>
            <div className="price">{formatPrice(product.price)}</div>
        </Product>
    );
};

export default CompactListProduct;
