import React from 'react';
import {
    Alert,
    Button,
    FormGroup,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
} from 'reactstrap';
import useEditProductReviewMutation from '../../graphql/mutations/editProductReview.js';
import Stars from '../../components/Stars.jsx';

const ReviewEdit = ({ isOpen, onClose, product, onDone, defaultValue }) => {
    const [review, setReview] = React.useState('');
    const [stars, setStars] = React.useState(null);
    const [error, setError] = React.useState(null);
    const [update, { loading }] = useEditProductReviewMutation();

    React.useEffect(() => {
        if (!defaultValue) {
            return;
        }

        setReview(defaultValue.review);
        setStars(defaultValue.stars);
    }, [defaultValue]);

    return (
        <Modal isOpen={isOpen} toggle={() => onClose()}>
            <ModalHeader toggle={() => onClose()}>Skriv anmeldelse</ModalHeader>
            <ModalBody>
                <FormGroup>
                    <Label>Vurdering</Label>
                    <div>
                        <Stars stars={stars} setStars={setStars} lg />
                    </div>
                </FormGroup>
                <FormGroup>
                    <Label>Anmeldelse</Label>
                    <Input
                        type="textarea"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                    />
                </FormGroup>
                {error && <Alert color="danger">{error}</Alert>}
                <p className="text-muted">
                    For å kunne få fordelspoeng må du både gi stjerner og skrive
                    en anmeldelse.
                </p>
            </ModalBody>
            <ModalFooter>
                <Button
                    color="primary"
                    disabled={loading || stars === null}
                    onClick={() => {
                        if (loading || stars === null) {
                            return;
                        }
                        setError(null);
                        update({
                            variables: {
                                stars,
                                review,
                                productId: product.id,
                            },
                        })
                            .then(() => {
                                onDone();
                            })
                            .catch(() => {
                                setError('Noe skjedde');
                            });
                    }}
                >
                    Lagre
                </Button>{' '}
                <Button color="danger" onClick={() => onClose()}>
                    Avbryt
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default ReviewEdit;
