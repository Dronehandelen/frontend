import React from 'react';
import EmailInput from './EmailInput.jsx';
import { Col, Container, Row } from 'reactstrap';

const Checkout = ({ onEmailConfirmed }) => {
    return (
        <Container>
            <Row>
                <Col md={6}>
                    <EmailInput onEmailConfirmed={onEmailConfirmed} />
                </Col>
            </Row>
        </Container>
    );
};

export default Checkout;
