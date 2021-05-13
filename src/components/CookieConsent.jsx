import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button, Col, Container, Row } from 'reactstrap';
import Cookies from 'js-cookie';
import AppContext from '../contexts/app';

const Wrapper = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #222;
    padding: 5px;
    color: white;
    text-align: center;
`;

const CookieConsent = () => {
    const { acceptedCookies } = React.useContext(AppContext);
    const [isJustSet, setIsJustSet] = React.useState(false);

    if (acceptedCookies() === 'yes' || isJustSet) {
        return <></>;
    }

    return (
        <Wrapper>
            <Container>
                <Row>
                    <Col>
                        Vi bruker informasjonskapsler på våre nettsider for å gi
                        deg en best mulig brukeropplevelse. Les mer om dette{' '}
                        <Link to="privacy-policy">her</Link>.{' '}
                        <Button
                            onClick={() => {
                                Cookies.set('acceptedCookies', 'yes');
                                setIsJustSet(true);
                            }}
                            size="sm"
                            color="primary"
                        >
                            Ok
                        </Button>
                    </Col>
                </Row>
            </Container>
        </Wrapper>
    );
};

export default CookieConsent;
