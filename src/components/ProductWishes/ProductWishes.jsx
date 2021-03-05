import React from 'react';
import cn from 'classnames';
import useGetProductWishesQuery from '../../graphql/queries/getProductWishes';
import useProductWishMutation from '../../graphql/mutations/productWish';
import useProductWishLikeMutation from '../../graphql/mutations/productWishLike';
import {
    Alert,
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Input,
    InputGroup,
    InputGroupAddon,
    Row,
    Spinner,
} from 'reactstrap';
import AuthContext from '../../contexts/auth';
import { Link, useLocation } from 'react-router-dom';
import tracking from '../../helpers/tracking.js';

const ProductWishes = ({
    fullscreen = false,
    wishSize = { lg: 4, md: 6 },
    wishCount = 4,
}) => {
    const location = useLocation();
    const { error, loading, refetch, data } = useGetProductWishesQuery();
    const [productWish] = useProductWishMutation();
    const [productWishLike] = useProductWishLikeMutation();
    const { isAuthenticated } = React.useContext(AuthContext);
    const [showMustLoginAlert, setShowMustLoginAlert] = React.useState(false);
    const [otherError, setError] = React.useState(false);
    const [name, setName] = React.useState('');

    const content = (
        <>
            <p className="text-muted">
                Vi ønsker å tilby så relevante produkter som mulig og ønsker
                derfor tilbakemelding på deres ønsker. Lik produktene du vil at
                vi skal få på lager. Du kan også legge inn dine ønsker.
            </p>
            {loading && (
                <div className="d-flex justify-content-center">
                    <Spinner />
                </div>
            )}
            {(otherError || error) && (
                <Alert color="danger">
                    Noe skjedde. Vennligst prøv igjen senere
                </Alert>
            )}
            {showMustLoginAlert && (
                <Alert color="warning">
                    <p>Du må være innlogget for å like og lage nye forslag.</p>
                    <Button
                        color="warning"
                        tag={Link}
                        to={`/login?redirectUrl=${
                            location.pathname + location.search
                        }`}
                        onClick={() => {
                            tracking.event(
                                'Produktønsker module',
                                '"Logg inn" clicked'
                            );
                        }}
                    >
                        Logg inn
                    </Button>
                    <Button
                        color="warning"
                        tag={Link}
                        to="/register"
                        className="ml-2"
                        onClick={() => {
                            tracking.event(
                                'Produktønsker module',
                                '"Lag bruker" clicked'
                            );
                        }}
                    >
                        Lag bruker
                    </Button>
                </Alert>
            )}
            <InputGroup className="mb-4">
                <Input
                    placeholder="Søk"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <InputGroupAddon addonType="append">
                    <Button
                        color="primary"
                        onClick={() => {
                            if (!isAuthenticated) {
                                return setShowMustLoginAlert(true);
                            }

                            if (name.length < 3) {
                                return;
                            }

                            tracking.event(
                                'Produktønsker module',
                                'Lag forslag clicked'
                            );

                            productWish({
                                variables: {
                                    name,
                                },
                            })
                                .then(() => {
                                    refetch();
                                    setName('');
                                })
                                .catch(setError);
                        }}
                    >
                        Lag forslag
                    </Button>
                </InputGroupAddon>
            </InputGroup>
            {data && (
                <Row>
                    {data.productWishes.edges
                        .filter((edge, index) => {
                            if (name.length === 0)
                                return fullscreen || index < wishCount;

                            return edge.node.productName
                                .toLowerCase()
                                .includes(name.toLowerCase());
                        })
                        .map((edge) => (
                            <Col
                                lg={wishSize.lg}
                                md={wishSize.md}
                                key={edge.node.id}
                                className="d-flex mb-4"
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                    if (edge.node.isLikedByCurrentUser) return;
                                    if (!isAuthenticated) {
                                        return setShowMustLoginAlert(true);
                                    }

                                    productWishLike({
                                        variables: {
                                            productWishId: edge.node.id,
                                        },
                                    })
                                        .then(() => refetch())
                                        .catch(setError);
                                }}
                            >
                                <i
                                    className={cn('fa text-dark fa-2x', {
                                        'fa-thumbs-o-up': !edge.node
                                            .isLikedByCurrentUser,
                                        'fa-thumbs-up':
                                            edge.node.isLikedByCurrentUser,
                                    })}
                                />
                                <div className="d-flex flex-column ml-3">
                                    <div>{edge.node.productName}</div>
                                    <div className="text-muted">
                                        {edge.node.likesCount} liker
                                    </div>
                                </div>
                            </Col>
                        ))}
                </Row>
            )}
        </>
    );

    if (fullscreen) {
        return content;
    }

    return (
        <Card>
            <CardHeader>
                <strong>Produktønsker</strong>
            </CardHeader>
            <CardBody>
                {content}
                <div className="mt-2 d-flex justify-content-center">
                    <Button
                        tag={Link}
                        to="/wishes"
                        size="lg"
                        block
                        onClick={() => {
                            tracking.event(
                                'Produktønsker module',
                                '"Se mer" clicked'
                            );
                        }}
                    >
                        Se mer <i className="ml-2 fa fa-arrow-right" />
                    </Button>
                </div>
            </CardBody>
        </Card>
    );
};

export default ProductWishes;
