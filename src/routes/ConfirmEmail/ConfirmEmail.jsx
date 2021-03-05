import React from 'react';
import { Container, Col, Row, Alert, Spinner, Button } from 'reactstrap';

import { useTranslation } from 'react-i18next';

export default ({ hasToken, error, newConfirmEmailStatus, onNew }) => {
    const { t } = useTranslation();

    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <h2>{t('Confirm your email')}</h2>
                    {!hasToken ? (
                        <div>{t('Check your inbox to confirm your email')}</div>
                    ) : error ? (
                        <Alert color="danger">
                            {t('Problems verifying your email')}
                        </Alert>
                    ) : (
                        <Spinner />
                    )}
                    <div className="mt-3">
                        <Button
                            color="primary"
                            disabled={newConfirmEmailStatus.loading}
                            onClick={onNew}
                        >
                            Send ny
                        </Button>
                    </div>
                    {newConfirmEmailStatus.error && (
                        <Alert color="danger" className="mt-2">
                            Noe skjedde. Vennligst prøv igjen senere
                        </Alert>
                    )}
                    {newConfirmEmailStatus.success && (
                        <Alert color="success" className="mt-2">
                            E-post sendt
                        </Alert>
                    )}
                </Col>
            </Row>
        </Container>
    );
};
