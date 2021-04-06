import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { gql } from '@apollo/client';
import { getImageUrlWithMaxSize } from '../../helpers/image';
import Stars from '../../components/Stars.jsx';

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

export const productReviewFragment = gql`
    fragment ProductReviewFragment on Product {
        alias
        id
        title
        primaryImage {
            fileId
            url
        }
    }
`;

const CompactListProduct = ({ review }) => {
    return (
        <Product to={'/p/' + review.product.alias}>
            <div className="imageWrapper">
                <img
                    src={getImageUrlWithMaxSize(
                        review.product.primaryImage.url,
                        {
                            maxHeight: 200,
                        }
                    )}
                />
            </div>
            <div className="title">
                <div>
                    <Stars stars={review.stars} />
                    <span
                        className="ml-1 text-muted"
                        style={{ fontSize: '0.8rem' }}
                    >
                        {review.product.title}
                    </span>
                </div>
                <div>{review.review}</div>
                <div className="text-muted" style={{ fontSize: '0.8rem' }}>
                    av {review.user.firstName} {review.user.lastName}
                </div>
            </div>
        </Product>
    );
};

export default CompactListProduct;
