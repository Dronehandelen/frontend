import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import {
    Container,
    Form,
    FormGroup,
    Label,
    Input,
    Col,
    Row,
    Alert,
    Button,
    Spinner,
    Card,
} from 'reactstrap';
import { useTranslation } from 'react-i18next';

import styles from './login.module.scss';

const Login = ({
    values,
    setValues,
    loading,
    error,
    login,
    onlyCard,
    clean,
}) => {
    const { t } = useTranslation();
    const content = (
        <Card body>
            <Form
                onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    login();
                }}
            >
                <FormGroup>
                    <Label>{t('Email')}</Label>
                    <Input
                        type="email"
                        name="email"
                        placeholder="email"
                        value={values.email}
                        onChange={(e) =>
                            setValues({
                                ...values,
                                email: e.target.value,
                            })
                        }
                    />
                </FormGroup>
                <FormGroup>
                    <Label>{t('Password')}</Label>
                    <Input
                        type="password"
                        name="password"
                        placeholder="password"
                        value={values.password}
                        onChange={(e) =>
                            setValues({
                                ...values,
                                password: e.target.value,
                            })
                        }
                    />
                </FormGroup>
                <div className="my-2 d-flex">
                    <Button type="submit" color="primary">
                        {t('Login')}
                    </Button>
                    {loading && (
                        <div className="d-flex justify-content-center flex-column ml-3">
                            <Spinner />
                        </div>
                    )}
                </div>
                {!clean && (
                    <>
                        <div>
                            <Link to="/reset-password-request">
                                Nullstill passord
                            </Link>
                        </div>
                        <div>
                            <Link to="/register">Lag ny bruker</Link>
                        </div>
                    </>
                )}
                {error ? (
                    <Alert color="danger" className="mt-3">
                        {error.message}
                    </Alert>
                ) : (
                    ''
                )}
            </Form>
        </Card>
    );

    if (onlyCard) {
        return content;
    }

    return (
        <div className={cn('pt-5', styles.login)}>
            <Container>
                <Row className="justify-content-md-center">
                    <Col md={6}>{content}</Col>
                </Row>
            </Container>
        </div>
    );
};

export default Login;
