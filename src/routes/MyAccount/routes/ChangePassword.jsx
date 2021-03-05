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
    Input,
    Label,
    Row,
    Spinner,
} from 'reactstrap';
import useChangePasswordMutation from '../../../graphql/mutations/changePassword.js';
import mutationRequest from '../../../helpers/mutationRequest.js';
import ManagedFormGroup from '../../../components/ManagedFormGroup.jsx';
import { Link } from 'react-router-dom';
import appConfig from '../../../config/app.js';

const RequestPasswordRequest = () => {
    const [changePassword] = useChangePasswordMutation();

    const [password, setPassword] = React.useState('');
    const [changePasswordStatus, setChangePasswordStatus] = React.useState({
        error: false,
        loading: false,
        success: false,
    });

    React.useEffect(() => {
        if (changePasswordStatus.success) {
            setTimeout(() => window.location.replace('/login'), 1000);
        }
    }, [changePasswordStatus.success]);

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
                        <BreadcrumbItem active>Endre passord</BreadcrumbItem>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row className="mb-4">
                <Col>
                    <h1>Endre passord</h1>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <Card body>
                        <Form
                            onSubmit={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                mutationRequest(
                                    setChangePasswordStatus,
                                    changePassword,
                                    {
                                        password,
                                    }
                                );
                            }}
                        >
                            <ManagedFormGroup
                                error={changePasswordStatus.error}
                                inputKey="password"
                            >
                                {(errors) => (
                                    <>
                                        <Label>Passord</Label>
                                        <Input
                                            type="password"
                                            name="password"
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                            invalid={!!errors}
                                        />
                                    </>
                                )}
                            </ManagedFormGroup>
                            <div className="mt-2 d-flex">
                                <Button type="submit">Endre passord</Button>
                                {changePasswordStatus.loading && (
                                    <div className="d-flex justify-content-center flex-column ml-3">
                                        <Spinner />
                                    </div>
                                )}
                            </div>
                            {changePasswordStatus.error && (
                                <Alert color="danger" className="mt-3">
                                    {changePasswordStatus.error.message}
                                </Alert>
                            )}
                            {changePasswordStatus.success && (
                                <Alert color="success" className="mt-3">
                                    Passordet ditt er nå endret.
                                </Alert>
                            )}
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default RequestPasswordRequest;
