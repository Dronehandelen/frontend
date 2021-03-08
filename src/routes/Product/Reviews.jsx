import React from 'react';
import { Button } from 'reactstrap';
import queryString from 'query-string';
import ReviewEdit from './ReviewEdit.jsx';
import Review, { productReviewFragment } from './Review.jsx';
import AuthContext from '../../contexts/auth.js';
import { Link, useLocation, useHistory } from 'react-router-dom';
import Card from '../../components/Card.jsx';
import CustomCardTitle from './components/CardTitle.jsx';
import { gql } from '@apollo/client';

export const productReviewsFragment = gql`
    fragment ProductReviews on Product {
        hasCurrentUserWrittenReview
        ...ProductReview
    }
    ${productReviewFragment}
`;

const Reviews = ({ reviews, product, refetch }) => {
    const location = useLocation();
    const history = useHistory();
    const query = queryString.parse(location.search);
    const modalOpenedOnInitialRender =
        query.openModal && query.openModal === '1';
    const [isOpen, setIsOpen] = React.useState(modalOpenedOnInitialRender);
    const [reviewToEdit, setReviewToEdit] = React.useState(
        modalOpenedOnInitialRender
    );
    const { isAuthenticated, isAuthenticating } = React.useContext(AuthContext);

    React.useEffect(() => {
        if (
            !isAuthenticating &&
            !isAuthenticated &&
            modalOpenedOnInitialRender
        ) {
            history.push(
                `/login?redirectUrl=${location.pathname + location.search}`
            );
        }
    }, [isAuthenticated, isAuthenticating]);

    return (
        <Card>
            <CustomCardTitle>Produktanmeldelser</CustomCardTitle>
            {reviews.length === 0 && <div>Ingen anmeldelser enda.</div>}
            {reviews.map((review) => (
                <Review
                    key={review.id}
                    review={review}
                    onChange={() => setReviewToEdit(review)}
                />
            ))}
            {isAuthenticated ? (
                !product.hasCurrentUserWrittenReview && (
                    <Button className="mt-3" onClick={() => setIsOpen(true)}>
                        Skriv anmeldelse
                    </Button>
                )
            ) : (
                <>
                    <hr />
                    <p className="text-muted mt-3">
                        For å kunne skrive anmeldelse må du være logget inn.{' '}
                        <Link
                            to={`/login?redirectUrl=${
                                location.pathname + location.search
                            }`}
                        >
                            Trykk her
                        </Link>{' '}
                        for å logge inn eller <Link to="/register">her</Link>{' '}
                        for å lage konto
                    </p>
                </>
            )}
            <ReviewEdit
                isOpen={isAuthenticated && (isOpen || reviewToEdit)}
                product={product}
                onDone={() => {
                    setIsOpen(false);
                    setReviewToEdit(null);
                    refetch();
                }}
                onClose={() => {
                    setIsOpen(false);
                    setReviewToEdit(null);
                }}
                defaultValue={reviewToEdit}
            />
        </Card>
    );
};

export default Reviews;
