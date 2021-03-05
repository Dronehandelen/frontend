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
import { Link } from 'react-router-dom';
import useNewPasswordRequestMutation from '../graphql/mutations/newPasswordRequest.js';
import mutationRequest from '../helpers/mutationRequest.js';
import ManagedFormGroup from '../components/ManagedFormGroup.jsx';

const RequestPasswordRequest = () => {
    const [email, setEmail] = React.useState('');
    const [newPasswordRequest] = useNewPasswordRequestMutation();

    const [
        newPasswordRequestStatus,
        setNewPasswordRequestStatus,
    ] = React.useState({
        error: false,
        loading: false,
        success: false,
    });

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card body>
                        <Form
                            onSubmit={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                mutationRequest(
                                    setNewPasswordRequestStatus,
                                    newPasswordRequest,
                                    { email }
                                );
                            }}
                        >
                            <ManagedFormGroup
                                error={newPasswordRequestStatus.error}
                                inputKey="email"
                            >
                                {(errors) => (
                                    <>
                                        <Label>E-post</Label>
                                        <Input
                                            type="email"
                                            name="email"
                                            placeholder="E-post"
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            invalid={!!errors}
                                        />
                                    </>
                                )}
                            </ManagedFormGroup>
                            <div>
                                <Link to="/login">Logg inn</Link>
                            </div>
                            <div className="mt-2 d-flex">
                                <Button type="submit">Nullstill passord</Button>
                                {newPasswordRequestStatus.loading && (
                                    <div className="d-flex justify-content-center flex-column ml-3">
                                        <Spinner />
                                    </div>
                                )}
                            </div>
                            {newPasswordRequestStatus.error && (
                                <Alert color="danger" className="mt-3">
                                    {newPasswordRequestStatus.error.message}
                                </Alert>
                            )}
                            {newPasswordRequestStatus.success && (
                                <Alert color="success" className="mt-3">
                                    Vi har nå sendt e-post til {email} med link
                                    for å nullstille passordet ditt
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
