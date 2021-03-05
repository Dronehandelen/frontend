import React from 'react';
import { Button, Input } from 'reactstrap';
import useEditProductQuestionMutation from '../../../graphql/mutations/editProductQuestion.js';

const QuestionInput = ({
    onCancel,
    onDone,
    parentId,
    productId,
    ...otherProps
}) => {
    const [input, setInput] = React.useState('');
    const [error, setError] = React.useState(false);
    const [updateOrCreateQuestion] = useEditProductQuestionMutation();

    return (
        <div {...otherProps}>
            <Input
                type="textarea"
                className="mb-2"
                value={input}
                onChange={e => setInput(e.target.value)}
            />
            {error && <div className="my-2 text-danger">{error}</div>}

            <div>
                <Button
                    color="primary"
                    onClick={() => {
                        if (input.length < 2) {
                            setError('Du må ha minst 2 bokstaver');
                        }

                        setError(false);

                        updateOrCreateQuestion({
                            variables: {
                                productId,
                                parentId,
                                content: input,
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
                </Button>
                <Button
                    color="danger"
                    className="ml-1"
                    onClick={() => onCancel()}
                >
                    Avbryt
                </Button>
            </div>
        </div>
    );
};

export default QuestionInput;
