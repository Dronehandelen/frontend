import React from 'react';
import {
    Alert,
    Button,
    Card,
    CardBody,
    CardHeader,
    Form,
    FormGroup,
    Input,
    Spinner,
} from 'reactstrap';
import useEmailExistsQuery from '../../graphql/queries/emailExists.js';
import tracking from '../../helpers/tracking.js';

const EmailInput = ({ onEmailConfirmed, email, setEmail }) => {
    const [
        getEmailExists,
        { loading, error, emailExists },
    ] = useEmailExistsQuery();

    React.useEffect(() => {
        if (emailExists == null) {
            return;
        }

        onEmailConfirmed(emailExists);
    }, [emailExists, onEmailConfirmed]);

    React.useEffect(() => {
        tracking.checkoutAction(1);
    }, []);

    return (
        <Card>
            <CardHeader>
                <strong>E-post</strong>
            </CardHeader>
            <CardBody>
                <Form
                    onSubmit={(e) => {
                        e.preventDefault();
                        e.stopPropagation();

                        if (email === '') {
                            return;
                        }

                        tracking.event(
                            'Checkout',
                            'E-post kort - Gå til neste steg',
                            email
                        );

                        getEmailExists({
                            variables: {
                                email,
                            },
                        });
                    }}
                >
                    <FormGroup>
                        <Input
                            type="email"
                            name="email"
                            placeholder="e-post"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </FormGroup>
                    {loading ? (
                        <Spinner />
                    ) : error ? (
                        <Alert color="danger">Noe skjedde</Alert>
                    ) : (
                        <Button block color="primary">
                            Neste
                        </Button>
                    )}
                </Form>
            </CardBody>
        </Card>
    );
};

export default EmailInput;
