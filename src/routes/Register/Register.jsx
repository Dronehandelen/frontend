import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import {
    Container,
    Form,
    Label,
    Input,
    Col,
    Row,
    Alert,
    Button,
    Spinner,
    Card,
    FormGroup,
} from 'reactstrap';
import { useTranslation } from 'react-i18next';
import ManagedFormGroup from '../../components/ManagedFormGroup.jsx';

const Register = ({
    values,
    setValues,
    loading,
    error,
    register,
    formOnly,
}) => {
    const { t } = useTranslation();

    const content = (
        <Form
            onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                register();
            }}
        >
            <div className="d-flex">
                <ManagedFormGroup
                    error={error}
                    inputKey="firstName"
                    className="mr-1"
                >
                    {(errors) => (
                        <>
                            <Label>{t('First name')}</Label>
                            <Input
                                type="text"
                                name="firstName"
                                placeholder={t('First name')}
                                value={values.firstName}
                                onChange={(e) =>
                                    setValues({
                                        ...values,
                                        firstName: e.target.value,
                                    })
                                }
                                invalid={!!errors}
                            />
                        </>
                    )}
                </ManagedFormGroup>
                <ManagedFormGroup error={error} inputKey="lastName">
                    {(errors) => (
                        <>
                            <Label>{t('Last name')}</Label>
                            <Input
                                type="text"
                                name="lastName"
                                placeholder={t('Last name')}
                                value={values.lastName}
                                onChange={(e) =>
                                    setValues({
                                        ...values,
                                        lastName: e.target.value,
                                    })
                                }
                                invalid={!!errors}
                            />
                        </>
                    )}
                </ManagedFormGroup>
            </div>
            <ManagedFormGroup error={error} inputKey="email">
                {(errors) => (
                    <>
                        <Label>{t('Email')}</Label>
                        <Input
                            type="email"
                            name="email"
                            placeholder="E-post"
                            value={values.email}
                            onChange={(e) =>
                                setValues({
                                    ...values,
                                    email: e.target.value,
                                })
                            }
                            invalid={!!errors}
                        />
                    </>
                )}
            </ManagedFormGroup>
            <ManagedFormGroup error={error} inputKey="password">
                {(errors) => (
                    <>
                        <Label>{t('Password')}</Label>
                        <Input
                            type="password"
                            name="password"
                            placeholder="Passord"
                            value={values.password}
                            onChange={(e) =>
                                setValues({
                                    ...values,
                                    password: e.target.value,
                                })
                            }
                            invalid={!!errors}
                        />
                    </>
                )}
            </ManagedFormGroup>
            <FormGroup check className="mb-2">
                <Label check>
                    <Input
                        type="checkbox"
                        onChange={() =>
                            setValues({
                                ...values,
                                newsletter: !values.newsletter,
                            })
                        }
                        checked={values.newsletter}
                    />{' '}
                    Vil du motta tilbud og informasjon fra oss?
                </Label>
            </FormGroup>
            <div className="text-muted" style={{ fontSize: '0.8em' }}>
                Ved å trykke "Lag bruker" bekrefter du at du har lest og
                samtykker med vår{' '}
                <Link to="/privacy-policy">Personvernerklæring</Link> og{' '}
                <Link to="/order-terms">Salgsbetingelser</Link>
            </div>
            <div className="mt-2 d-flex">
                <Button type="submit" color="primary">
                    Lag bruker
                </Button>
                {loading && (
                    <div className="d-flex justify-content-center flex-column ml-3">
                        <Spinner />
                    </div>
                )}
            </div>
            <div className="mt-3">
                <Link to="/login">
                    {t('Already have an account? Go to login')}
                </Link>
            </div>
            {error ? (
                <Alert color="danger" className="mt-3">
                    {error.message}
                </Alert>
            ) : (
                ''
            )}
        </Form>
    );

    if (formOnly) {
        return content;
    }

    return (
        <div className={cn('pt-5')}>
            <Container>
                <Row className="justify-content-md-center">
                    <Col md={8}>
                        <Card body>{content}</Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Register;
