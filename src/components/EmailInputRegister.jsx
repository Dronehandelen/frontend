import React from 'react';
import {
    Button,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Modal,
    ModalBody,
    ModalHeader,
} from 'reactstrap';
import Register from '../routes/Register/RegisterContainer.jsx';
import tracking from '../helpers/tracking.js';

const EmailInputRegister = ({ withIntro = true }) => {
    const [email, setEmail] = React.useState('');
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div>
            {withIntro && (
                <p>
                    Lag deg bruker for å motta alle de siste tilbud på e-post.
                </p>
            )}
            <div style={{ maxWidth: 500 }}>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                    </InputGroupAddon>
                    <Input
                        placeholder="E-post"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <InputGroupAddon addonType="append">
                        <Button
                            color="primary"
                            onClick={() => {
                                setIsOpen(true);
                                tracking.event(
                                    'Email register module',
                                    '"Lag bruker" clicked'
                                );
                            }}
                        >
                            Lag bruker
                        </Button>
                    </InputGroupAddon>
                </InputGroup>
            </div>
            <Modal isOpen={isOpen} toggle={() => setIsOpen(false)}>
                <ModalHeader toggle={() => setIsOpen(false)}>
                    Lag bruker
                </ModalHeader>
                <ModalBody>
                    <p>
                        Fyll inn din informasjon for å motta vårt nyhetsbrev med
                        gode tilbud og annen relevant informasjon.
                    </p>
                    <Register formOnly prefilledEmail={email} />
                </ModalBody>
            </Modal>
        </div>
    );
};

export default EmailInputRegister;
