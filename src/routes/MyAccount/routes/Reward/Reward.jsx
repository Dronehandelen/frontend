import React from 'react';
import {
    Breadcrumb,
    BreadcrumbItem,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Col,
    Container,
    Progress,
    Row,
    Table,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import appConfig from '../../../../config/app.js';
import auth from '../../../../contexts/auth.js';
import configContext from '../../../../contexts/config.js';
import DefaultHookQuery from '../../../../containers/DefaultHookQuery.jsx';
import date from '../../../../helpers/date.js';
import { getRewardDescription } from '../../../../components/Reward';

const Reward = ({ lastEarnedRewardsData }) => {
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
                        <BreadcrumbItem>
                            <Link to="/my-account">Min side</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>Nyhetsbrev</BreadcrumbItem>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row className="mb-4">
                <Col>
                    <h1>Fordelsprogram</h1>
                </Col>
            </Row>
            <Row>
                <Col md={12} className="mb-2">
                    <Card>
                        <CardHeader className="bg-warning">
                            VIP Klubb
                        </CardHeader>
                        <CardBody>
                            <p>
                                Du har tjent {user.reward.pointsLast12months}{' '}
                                poeng de siste 12 månender{' '}
                                {isVIP && <>og er med i VIP-klubben</>}.
                            </p>
                            {!isVIP && (
                                <p>
                                    For å bli med i VIP klubb må du ha tjent opp{' '}
                                    {reward.vipPointsLast12Months} poeng de
                                    siste 12 månender.
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
                            <h3 className="mt-3">Fordeler:</h3>
                            <ul>
                                <li>
                                    Gratis frakt på alle kjøp over{' '}
                                    {reward.vipFreeShippingAfterAmount}kr
                                </li>
                                <li>40% på alle propeller</li>
                                <li>VIP-Tilbud</li>
                            </ul>
                            <p>
                                <Link to="/customer-support/reward-terms">
                                    Les mer
                                </Link>
                            </p>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={12} className="mb-2">
                    <Card>
                        <CardHeader>Måter du kan tjene poeng på</CardHeader>
                        <CardBody>
                            <Row>
                                <Col md={4} className="mb-2">
                                    <Card>
                                        <CardHeader>Kjøp</CardHeader>
                                        <CardBody>
                                            <p>
                                                Du får 1 poeng per krone du
                                                bruker hos oss.
                                            </p>
                                            <p className="text-muted">
                                                Du får ikke poeng for frakt.
                                            </p>
                                        </CardBody>
                                        <CardFooter>
                                            1 poeng per krone brukt
                                        </CardFooter>
                                    </Card>
                                </Col>
                                <Col md={4} className="mb-2">
                                    <Card>
                                        <CardHeader>Anmeldelser</CardHeader>
                                        <CardBody>
                                            <p>
                                                Du får {reward.reviewPoints}{' '}
                                                poeng per anmeldelse du skriver.
                                                Du kan kun skrive en anmeldelse
                                                per produkt.
                                            </p>
                                        </CardBody>
                                        <CardFooter>
                                            {reward.reviewPoints} poeng
                                        </CardFooter>
                                    </Card>
                                </Col>
                                <Col md={4} className="mb-2">
                                    <Card>
                                        <CardHeader>Besøk nettsiden</CardHeader>
                                        <CardBody>
                                            <p>
                                                Du får {reward.dailyVisitPoints}{' '}
                                                poeng per daglig besøk til
                                                nettsiden.
                                            </p>
                                        </CardBody>
                                        <CardFooter>
                                            {reward.dailyVisitPoints} poeng per
                                            dag
                                        </CardFooter>
                                    </Card>
                                </Col>
                                {false && (
                                    <>
                                        <Col md={4} className="mb-2">
                                            <Card>
                                                <CardHeader>
                                                    Fødselsdato
                                                </CardHeader>
                                                <CardBody>
                                                    <p>
                                                        Skriv inn din
                                                        fødselsdato for å få 50
                                                        poeng.
                                                    </p>
                                                </CardBody>
                                                <CardFooter>
                                                    50 poeng
                                                </CardFooter>
                                            </Card>
                                        </Col>
                                        <Col md={4} className="mb-2">
                                            <Card>
                                                <CardHeader>
                                                    Velg type drone
                                                </CardHeader>
                                                <CardBody>
                                                    <p>
                                                        Velg type drone du flyr
                                                        for å få 100 poeng.
                                                    </p>
                                                    <ul>
                                                        <li>Racing</li>
                                                        <li>Freestyle</li>
                                                        <li>Cinematic</li>
                                                        <li>
                                                            Annet:{' '}
                                                            <input type="text" />
                                                        </li>
                                                    </ul>
                                                </CardBody>
                                                <CardFooter>
                                                    100 poeng
                                                </CardFooter>
                                            </Card>
                                        </Col>
                                    </>
                                )}
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <Card>
                        <CardHeader>Siste opptjente poeng</CardHeader>
                        <CardBody>
                            <DefaultHookQuery
                                queryHookData={lastEarnedRewardsData}
                            >
                                {({ data, fetchMore }) => {
                                    return (
                                        <>
                                            <Table>
                                                <thead>
                                                    <tr>
                                                        <th>Dato</th>
                                                        <th>Antall poeng</th>
                                                        <th>Beskrivelse</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {data.myUser.latestEarnedRewards.edges.map(
                                                        (
                                                            latestEarnedReward
                                                        ) => (
                                                            <tr
                                                                key={
                                                                    latestEarnedReward
                                                                        .node.id
                                                                }
                                                            >
                                                                <td>
                                                                    {date.niceDateTime(
                                                                        latestEarnedReward
                                                                            .node
                                                                            .earnedAt
                                                                    )}
                                                                </td>
                                                                <td>
                                                                    {
                                                                        latestEarnedReward
                                                                            .node
                                                                            .amount
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {getRewardDescription(
                                                                        latestEarnedReward
                                                                            .node
                                                                            .rewardPointActionId
                                                                    )}
                                                                </td>
                                                            </tr>
                                                        )
                                                    )}
                                                </tbody>
                                            </Table>
                                            <div
                                                className="btn-link"
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => fetchMore()}
                                            >
                                                Last inn flere
                                            </div>
                                        </>
                                    );
                                }}
                            </DefaultHookQuery>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Reward;
