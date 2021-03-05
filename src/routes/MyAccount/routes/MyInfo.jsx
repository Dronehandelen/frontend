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
import useUpdateMyUserMutation from '../../../graphql/mutations/updateMyUser.js';
import mutationRequest from '../../../helpers/mutationRequest.js';
import ManagedFormGroup from '../../../components/ManagedFormGroup.jsx';
import { Link } from 'react-router-dom';
import appConfig from '../../../config/app.js';
import AuthContext from '../../../contexts/auth.js';
import {
    defaultAddressValues,
    AddressFields,
    cleanupAddress,
} from '../../../components/Address';

const MyInfo = () => {
    const { user, refetch } = React.useContext(AuthContext);

    const [updateMyUser] = useUpdateMyUserMutation();

    const [values, setValues] = React.useState({
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone || '',
        address: user.address
            ? cleanupAddress(user.address)
            : defaultAddressValues,
    });

    const [userInfoStatus, setUserInfoStatus] = React.useState({
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
                        <BreadcrumbItem active>Oppdater</BreadcrumbItem>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row className="mb-4">
                <Col>
                    <h1>Min info</h1>
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
                                    setUserInfoStatus,
                                    updateMyUser,
                                    values,
                                    () => refetch()
                                );
                            }}
                        >
                            <div className="d-flex">
                                <ManagedFormGroup
                                    error={userInfoStatus.error}
                                    inputKey="firstName"
                                    className="mr-1"
                                >
                                    {(errors) => (
                                        <>
                                            <Label>Fornavn</Label>
                                            <Input
                                                type="text"
                                                name="firstName"
                                                placeholder="Fornavn"
                                                value={values.firstName}
                                                onChange={(e) =>
                                                    setValues({
                                                        ...values,
                                                        firstName:
                                                            e.target.value,
                                                    })
                                                }
                                                invalid={!!errors}
                                            />
                                        </>
                                    )}
                                </ManagedFormGroup>
                                <ManagedFormGroup
                                    error={userInfoStatus.error}
                                    inputKey="lastName"
                                >
                                    {(errors) => (
                                        <>
                                            <Label>Etternavn</Label>
                                            <Input
                                                type="text"
                                                name="lastName"
                                                placeholder="Etternavn"
                                                value={values.lastName}
                                                onChange={(e) =>
                                                    setValues({
                                                        ...values,
                                                        lastName:
                                                            e.target.value,
                                                    })
                                                }
                                                invalid={!!errors}
                                            />
                                        </>
                                    )}
                                </ManagedFormGroup>
                            </div>
                            <ManagedFormGroup
                                error={userInfoStatus.error}
                                inputKey="phone"
                            >
                                {(errors) => (
                                    <>
                                        <Label>Telefon</Label>
                                        <Input
                                            name="phone"
                                            placeholder="Telefon"
                                            value={values.phone}
                                            onChange={(e) =>
                                                setValues({
                                                    ...values,
                                                    phone: e.target.value,
                                                })
                                            }
                                            invalid={!!errors}
                                        />
                                    </>
                                )}
                            </ManagedFormGroup>
                            <AddressFields
                                error={userInfoStatus.error}
                                setState={(newAddress) =>
                                    setValues({
                                        ...values,
                                        address: {
                                            ...values.address,
                                            ...newAddress,
                                        },
                                    })
                                }
                                state={values.address}
                                keyPrefix="address."
                            />
                            <div className="mt-2 d-flex">
                                <Button type="submit">Oppdater</Button>
                                {userInfoStatus.loading && (
                                    <div className="d-flex justify-content-center flex-column ml-3">
                                        <Spinner />
                                    </div>
                                )}
                            </div>
                            {userInfoStatus.error && (
                                <Alert color="danger" className="mt-3">
                                    {userInfoStatus.error.message}
                                </Alert>
                            )}
                            {userInfoStatus.success && (
                                <Alert color="success" className="mt-3">
                                    Oppdatert!
                                </Alert>
                            )}
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default MyInfo;
