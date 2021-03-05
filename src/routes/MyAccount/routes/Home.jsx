import React from 'react';
import {
    Breadcrumb,
    BreadcrumbItem,
    Card,
    CardBody,
    CardHeader,
    Col,
    Container,
    Progress,
    Row,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import appConfig from '../../../config/app.js';
import auth from '../../../contexts/auth.js';
import configContext from '../../../contexts/config.js';

const Home = ({ match }) => {
    const { user } = React.useContext(auth);
    const { reward } = React.useContext(configContext);

    const isVIP =
        user.reward.pointsLast12months >= reward.vipPointsLast12Months;

    return (
        <Container>
            <Row>
                <Col>
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to="/">{appConfig.appName}</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>Min side</BreadcrumbItem>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row className="mb-4">
                <Col>
                    <h1>Min side</h1>
                </Col>
            </Row>
            <Row>
                {user.reward.isEnabled && (
                    <Col md={6} className="mb-2">
                        <Card>
                            <CardHeader>Fordeler</CardHeader>
                            <CardBody>
                                <p>
                                    Du har tjent{' '}
                                    {user.reward.pointsLast12months} poeng de
                                    siste 12 månender{' '}
                                    {isVIP && <>og er med i VIP-klubben</>}.
                                </p>
                                {!isVIP && (
                                    <p>
                                        Du mangler{' '}
                                        {reward.vipPointsLast12Months -
                                            user.reward.pointsLast12months}{' '}
                                        poeng for å bli med i VIP klubben.
                                    </p>
                                )}
                                <Progress
                                    value={
                                        (user.reward.pointsLast12months /
                                            reward.vipPointsLast12Months) *
                                        100
                                    }
                                    color="warning"
                                />
                                <div className="text-muted">
                                    {user.reward.pointsLast12months}/
                                    {reward.vipPointsLast12Months} poeng
                                </div>
                                <div className="mt-2">
                                    <Link to={match.url + '/reward'}>
                                        Gå til fordelsprogram
                                    </Link>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                )}
                <Col md={6} className="mb-2">
                    <Card>
                        <CardHeader>Mine side</CardHeader>
                        <CardBody>
                            <p>
                                <Link to={match.url + '/change-password'}>
                                    Endre passord
                                </Link>
                            </p>
                            <p>
                                <Link to={match.url + '/my-info'}>
                                    Oppdater informasjon om meg
                                </Link>
                            </p>
                            <p>
                                <Link to={match.url + '/newsletter'}>
                                    Nyhetsbrevet
                                </Link>
                            </p>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={6} className="mb-2">
                    <Card>
                        <CardHeader>Mine ordre</CardHeader>
                        <CardBody>
                            <p className="text-muted">
                                Her finner du alt av informasjon om dine ordre.
                            </p>
                            <Link to={match.url + '/orders'}>
                                Ordreoversikt
                            </Link>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Home;
