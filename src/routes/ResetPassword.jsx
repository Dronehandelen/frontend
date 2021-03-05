import React from 'react';
import {
    Alert,
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
import { Link, useLocation } from 'react-router-dom';
import useResetPasswordMutation from '../graphql/mutations/resetPassword.js';
import mutationRequest from '../helpers/mutationRequest.js';
import ManagedFormGroup, { getError } from '../components/ManagedFormGroup.jsx';
import queryString from 'query-string';

const RequestPasswordRequest = () => {
    const location = useLocation();
    const [resetPassword] = useResetPasswordMutation();

    const [password, setPassword] = React.useState('');
    const [resetPasswordStatus, setResetPasswordStatus] = React.useState({
        error: false,
        loading: false,
        success: false,
    });
    const token = React.useMemo(() => {
        const query = queryString.parse(location.search);
        return query.token || null;
    }, [location]);

    const tokenError = getError(resetPasswordStatus.error, 'token');

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={4}>
                    <Card body>
                        {!token && <Alert color="danger">Ugyldig url</Alert>}
                        {token && (
                            <Form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    mutationRequest(
                                        setResetPasswordStatus,
                                        resetPassword,
                                        {
                                            token,
                                            newPassword: password,
                                        }
                                    );
                                }}
                            >
                                <ManagedFormGroup
                                    error={resetPasswordStatus.error}
                                    inputKey="newPassword"
                                >
                                    {(errors) => (
                                        <>
                                            <Label>Ny passord</Label>
                                            <Input
                                                type="password"
                                                name="newPassword"
                                                value={password}
                                                onChange={(e) =>
                                                    setPassword(e.target.value)
                                                }
                                                invalid={!!errors}
                                            />
                                        </>
                                    )}
                                </ManagedFormGroup>
                                <div>
                                    <Link to="/reset-password-request">
                                        Send ny nullstill passord e-post
                                    </Link>
                                </div>
                                <div className="mt-2 d-flex">
                                    <Button type="submit">
                                        Nullstill passord
                                    </Button>
                                    {resetPasswordStatus.loading && (
                                        <div className="d-flex justify-content-center flex-column ml-3">
                                            <Spinner />
                                        </div>
                                    )}
                                </div>
                                {resetPasswordStatus.error && (
                                    <Alert color="danger" className="mt-3">
                                        {tokenError && tokenError.length > 0
                                            ? tokenError[0]
                                            : resetPasswordStatus.error.message}
                                    </Alert>
                                )}
                                {resetPasswordStatus.success && (
                                    <Alert color="success" className="mt-3">
                                        Passordet ditt er nå endret.{' '}
                                        <Link to="/login">Gå til logg inn</Link>
                                        .
                                    </Alert>
                                )}
                            </Form>
                        )}
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default RequestPasswordRequest;
