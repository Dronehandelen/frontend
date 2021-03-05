import React from 'react';
import {
    Alert,
    Breadcrumb,
    BreadcrumbItem,
    Button,
    Card,
    Col,
    Container,
    Form,
    FormGroup,
    Input,
    Label,
    Row,
    Spinner,
} from 'reactstrap';
import useUserNewsletterMutation from '../../../graphql/mutations/userNewsletter.js';
import mutationRequest from '../../../helpers/mutationRequest.js';
import ManagedFormGroup from '../../../components/ManagedFormGroup.jsx';
import { Link } from 'react-router-dom';
import appConfig from '../../../config/app.js';
import AuthContext from '../../../contexts/auth.js';

const Newsletter = () => {
    const { user, refetch } = React.useContext(AuthContext);
    const [userNewsletter] = useUserNewsletterMutation();

    const [newsletter, setNewsletter] = React.useState(user.newsletter);
    const [userNewsletterStatus, setUserNewsletterStatus] = React.useState({
        error: false,
        loading: false,
        success: false,
    });

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
                    <h1>Nyhetsbrev</h1>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <Card body>
                        <p className="text-muted">
                            Vi holder dere oppdatert på nye varer og gode tilbud
                            som kommer. Vi sender også informasjon om det som er
                            relevant for våre kunder.
                        </p>
                        <Form
                            onSubmit={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                mutationRequest(
                                    setUserNewsletterStatus,
                                    userNewsletter,
                                    {
                                        newsletter,
                                    },
                                    () => refetch()
                                );
                            }}
                        >
                            <ManagedFormGroup
                                error={userNewsletterStatus.error}
                                inputKey="newsletter"
                            >
                                {(errors) => (
                                    <FormGroup check className="mb-2">
                                        <Label check>
                                            <Input
                                                type="checkbox"
                                                onChange={() =>
                                                    setNewsletter(!newsletter)
                                                }
                                                checked={newsletter}
                                                invalid={!!errors}
                                            />{' '}
                                            Vil du motta tilbud og informasjon
                                            fra oss?
                                        </Label>
                                    </FormGroup>
                                )}
                            </ManagedFormGroup>
                            <div className="mt-2 d-flex">
                                <Button type="submit">Lagre</Button>
                                {userNewsletterStatus.loading && (
                                    <div className="d-flex justify-content-center flex-column ml-3">
                                        <Spinner />
                                    </div>
                                )}
                            </div>
                            {userNewsletterStatus.error && (
                                <Alert color="danger" className="mt-3">
                                    {userNewsletterStatus.error.message}
                                </Alert>
                            )}
                            {userNewsletterStatus.success && (
                                <Alert color="success" className="mt-3">
                                    Lagret
                                </Alert>
                            )}
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Newsletter;
