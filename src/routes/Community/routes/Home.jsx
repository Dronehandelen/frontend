import React from 'react';
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Container,
    Row,
} from 'reactstrap';

const Home = () => {
    return (
        <Container>
            <Row>
                <Col md={6}>
                    <p className="">
                        Her vil vi prøve å samle så mange ressurser som mulig
                        for deg som driver med drone. Da tenker vi alt fra
                        racing droner til deg som flyr DJI.
                    </p>
                </Col>
            </Row>
            <Row>
                <Col md={3}>
                    <Card>
                        <CardHeader>Kom i gang med FPV</CardHeader>
                        <CardBody>
                            <p>
                                For deg som har lyst å komme i gang med FPV men
                                vet ikke helt hvor du skal starte
                            </p>
                            <Button color="primary">Les mer</Button>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card>
                        <CardHeader>Norske ressurser</CardHeader>
                        <CardBody>
                            <p>
                                For deg som er på jakt etter gode norske video
                                og artikler.
                            </p>
                            <Button color="primary">Les mer</Button>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Home;
