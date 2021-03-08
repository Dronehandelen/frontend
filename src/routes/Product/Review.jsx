import React from 'react';
import Stars from '../../components/Stars.jsx';
import styled from 'styled-components';
import { gql } from '@apollo/client';
import auth from '../../contexts/auth.js';
import { Button } from 'reactstrap';

const Review = styled.div`
    margin-bottom: 10px;
`;

const ReviewText = styled.div`
    white-space: pre-wrap;
`;

const User = styled.div`
    font-size: 0.8em;
    font-style: italic;
`;

export const productReviewFragment = gql`
    fragment ProductReview on Product {
        reviews {
            id
            review
            stars
            createdAt
            user {
                id
                firstName
                lastName
            }
        }
    }
`;

export default ({ review, onChange }) => {
    const { user } = React.useContext(auth);

    return (
        <Review>
            <div>
                <Stars stars={review.stars} />
            </div>
            <User>
                av {review.user.firstName} {review.user.lastName}
            </User>
            <ReviewText>{review.review}</ReviewText>
            {user && user.id === review.user.id && (
                <div
                    className="btn-link"
                    style={{ cursor: 'pointer' }}
                    onClick={onChange}
                >
                    Endre
                </div>
            )}
        </Review>
    );
};
