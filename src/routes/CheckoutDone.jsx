import React from 'react';
import { Button, Col, Container, Row } from 'reactstrap';
import Helmet from '../components/Helmet';
import AuthContext from '../contexts/auth';
import { Link } from 'react-router-dom';
import cartContext from '../contexts/cartContext.js';
import SuccessCheck from '../components/SuccessCheck.jsx';

const CheckoutDone = () => {
    const { isAuthenticated } = React.useContext(AuthContext);
    const { refetchCart } = React.useContext(cartContext);

    React.useEffect(() => {
        refetchCart();
    }, [refetchCart]);

    return (
        <Container>
            <Helmet title="Betaling velykket" />
            <Row className="justify-content-center">
                <Col md={8}>
                    <div className="d-flex justify-content-center">
                        <SuccessCheck />
                    </div>
                    <div>
                        <h1 className="text-center mt-2">Betaling velykket</h1>
                        <p className="text-center">
                            Betaling er velykket. Du vil få e-post innen kort
                            tid med bekreftelse og en annen e-post med
                            sporingsinformasjon innen 2 dager.
                        </p>
                    </div>
                    {!isAuthenticated && (
                        <div className="text-center">
                            <div className="mt-2">
                                Registrer deg for å få oversikt over dine
                                bestillinger og for muligheten til å hente ut
                                kvitteringen din. Du kan også abonnere på
                                nyhetsbrevet vårt for å få de nyeste tilbudene.
                            </div>
                            <Button
                                tag={Link}
                                to="/register"
                                color="primary"
                                size="lg"
                                className="mt-3"
                            >
                                Lag bruker
                            </Button>
                        </div>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default CheckoutDone;
