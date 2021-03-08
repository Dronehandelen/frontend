import React from 'react';
import queryString from 'query-string';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { Alert, Col, Container, Row, Spinner } from 'reactstrap';
import tracking from '../../../helpers/tracking';

const QUERY = gql`
    query VippsCallback($token: String!) {
        vippsCallback(token: $token) {
            success
            order {
                id
                totalPrice
                shippingPrice
                orderProducts {
                    amount
                    price
                    product {
                        id
                        title
                    }
                }
            }
        }
    }
`;

const VippsCallback = () => {
    const location = useLocation();
    const history = useHistory();
    const token = React.useMemo(() => {
        const query = queryString.parse(location.search);

        return query.token || null;
    }, []);

    const { data, loading, error } = useQuery(QUERY, {
        variables: {
            token,
        },
        ssr: false,
    });

    React.useEffect(() => {
        if (data && data.vippsCallback.success) {
            tracking.transactionDone(
                data.vippsCallback.order.totalPrice,
                data.vippsCallback.order.shippingPrice,
                data.vippsCallback.order
            );
            history.push('/checkout-done');
        }
    }, [data]);

    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md={3}>
                    <img
                        width="100%"
                        src="/vipps/vipps.svg"
                        alt=""
                        style={{ marginLeft: -15, marginTop: -10 }}
                    />
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col md={6}>
                    {loading && (
                        <>
                            <p>
                                Vi fullfører din bestilling. Vennligst vent til
                                vi er ferdig. Dette kan ta opp til et minutt.
                            </p>
                            <div className="d-flex justify-content-center">
                                <Spinner
                                    style={{ width: '3rem', height: '3rem' }}
                                />
                            </div>
                        </>
                    )}
                    {(error || (data && !data.vippsCallback.success)) && (
                        <>
                            <Alert color="danger">
                                <h3>Betaling ikke gjennomført</h3>
                                <p>
                                    Vi kunne ikke fullføre din bestilling. Ta
                                    kontakt med oss om problemet gjentar seg.
                                </p>
                                <p>
                                    <Link to="/checkout">
                                        Gå til kassen og prøv på nytt
                                    </Link>
                                </p>
                            </Alert>
                        </>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default VippsCallback;
