import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from 'reactstrap';
import styled from 'styled-components';
import QuestionInput from './QuestionInput.jsx';
import AuthContext from '../../../contexts/auth.js';

const Question = styled.div`
    border-bottom: 1px solid gray;
    margin-bottom: 10px;
    padding: 10px 0;
`;

const Responses = styled.div`
    padding-left: 20px;
    margin-top: 20px;
`;

const Questions = ({ questions, productId, refetch }) => {
    const location = useLocation();
    const { isAuthenticated } = React.useContext(AuthContext);
    const [isCreating, setIsCreating] = React.useState(false);
    const [isAnswering, setIsAnswering] = React.useState(false);

    return (
        <div>
            {questions.map((question) => (
                <Question key={question.id}>
                    <div>{question.content}</div>
                    <div className="text-muted">
                        <small>
                            {question.user.firstName} {question.user.lastName}
                            {isAuthenticated && (
                                <>
                                    {' '}
                                    -{' '}
                                    <Link
                                        to="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            setIsAnswering(question.id);
                                        }}
                                    >
                                        Skriv svar
                                    </Link>
                                </>
                            )}
                        </small>
                    </div>
                    <Responses>
                        {question.answers.map((answer) => (
                            <div key={answer.id}>
                                <div>{answer.content}</div>
                                <div>
                                    <small>
                                        {answer.user.firstName}{' '}
                                        {answer.user.lastName}
                                    </small>
                                </div>
                            </div>
                        ))}
                        {isAnswering === question.id && (
                            <QuestionInput
                                className="mt-2"
                                onCancel={() => setIsAnswering(false)}
                                productId={productId}
                                parentId={question.id}
                                onDone={() => {
                                    setIsAnswering(false);
                                    refetch();
                                }}
                            />
                        )}
                    </Responses>
                </Question>
            ))}
            {!isAuthenticated ? (
                <p className="text-muted mt-3">
                    For å kunne skrive spørsmål må du være logget inn.{' '}
                    <Link
                        to={`/login?redirectUrl=${
                            location.pathname + location.search
                        }`}
                    >
                        Trykk her
                    </Link>{' '}
                    for å logge inn eller <Link to="/register">her</Link> for å
                    lage konto
                </p>
            ) : isCreating ? (
                <QuestionInput
                    onCancel={() => setIsCreating(false)}
                    productId={productId}
                    onDone={() => {
                        setIsCreating(false);
                        refetch();
                    }}
                />
            ) : (
                <Button onClick={() => setIsCreating(true)}>
                    Still spørsmål
                </Button>
            )}
        </div>
    );
};

export default Questions;
