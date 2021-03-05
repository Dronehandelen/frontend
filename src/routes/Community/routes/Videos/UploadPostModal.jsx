import React from 'react';
import {
    Button,
    Card,
    FormFeedback,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
} from 'reactstrap';
import getYouTubeID from 'get-youtube-id';
import ManagedFormGroup from '../../../../components/ManagedFormGroup.jsx';
import useVideoPostMutation from '../../../../graphql/mutations/videoPost.js';

const UploadPostModal = ({ isOpen, onClose, onAdded }) => {
    const [videoPost] = useVideoPostMutation();
    const [error, setError] = React.useState(false);
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [url, setUrl] = React.useState('');
    const [isYoutubeLinkInvalid, setIsYoutubeLinkInvalid] = React.useState(
        false
    );

    return (
        <Modal isOpen={isOpen} toggle={onClose}>
            <ModalHeader toggle={onClose}>Last opp video</ModalHeader>
            <ModalBody>
                <ManagedFormGroup error={error} inputKey="title">
                    {(errors) => (
                        <>
                            <Label>Tittel</Label>
                            <Input
                                type="text"
                                name="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                invalid={!!errors}
                            />
                        </>
                    )}
                </ManagedFormGroup>
                <ManagedFormGroup error={error} inputKey="description">
                    {(errors) => (
                        <>
                            <Label>Kort beskrivelse</Label>
                            <Input
                                type="textarea"
                                name="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                invalid={!!errors}
                            />
                        </>
                    )}
                </ManagedFormGroup>
                <ManagedFormGroup error={error} inputKey="youtubeVideoId">
                    {(errors) => (
                        <>
                            <Label>Youtube link</Label>
                            <Input
                                type="text"
                                name="youtubeVideoId"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                invalid={isYoutubeLinkInvalid || !!errors}
                            />
                            {isYoutubeLinkInvalid && (
                                <FormFeedback>
                                    Linken er ikke gyldig
                                </FormFeedback>
                            )}
                        </>
                    )}
                </ManagedFormGroup>
                <Card body className="bg-light text-muted">
                    Det er bare tillatt å laste opp video som handler om drone
                    fra norske flygere. Hvis du misbruker denne funksjonen kan
                    du bli låst ute uten forvarsel.
                </Card>
            </ModalBody>
            <ModalFooter>
                <Button
                    color="primary"
                    onClick={() => {
                        const youtubeLink = getYouTubeID(url);

                        setIsYoutubeLinkInvalid(!youtubeLink);

                        if (!youtubeLink) {
                            return;
                        }

                        videoPost({
                            variables: {
                                videoPost: {
                                    title,
                                    description,
                                    youtubeVideoId: youtubeLink,
                                },
                            },
                        })
                            .then(() => {
                                setTitle('');
                                setDescription('');
                                setUrl('');
                                onAdded();
                            })
                            .catch(setError);
                    }}
                >
                    Last opp
                </Button>{' '}
                <Button color="secondary" onClick={onClose}>
                    Avbryt
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default UploadPostModal;
