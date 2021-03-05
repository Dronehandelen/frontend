import React from 'react';
import {
    Alert,
    Button,
    Col,
    Container,
    Jumbotron,
    Row,
    Spinner,
} from 'reactstrap';
import styled from 'styled-components';
import ReactPlayer from 'react-player';
import useGetVideoPostsQuery from '../../../../graphql/queries/getVideoPosts.js';
import date from '../../../../helpers/date.js';
import AuthContext from '../../../../contexts/auth.js';
import { Link, useLocation } from 'react-router-dom';
import UploadPostModal from './UploadPostModal.jsx';
import useVideoPostLikeMutation from '../../../../graphql/mutations/videoPostLike.js';

const StyledVideo = styled.div`
    padding: 40px 0;
    border-bottom: 1px solid gray;
`;

const Videos = () => {
    const {
        error,
        loading,
        data,
        fetchMore,
        refetch,
    } = useGetVideoPostsQuery();
    const [videoPostLike] = useVideoPostLikeMutation();
    const { isAuthenticated } = React.useContext(AuthContext);
    const [isOpen, setIsOpen] = React.useState(false);
    const location = useLocation();

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={6}>
                    <Jumbotron>
                        <h1>Video fra samfunnet</h1>
                        <p>
                            Dette er en feed med video fra norske
                            dronesamfunnet.
                        </p>
                        {isAuthenticated && (
                            <>
                                <Button
                                    color="success"
                                    onClick={() => setIsOpen(true)}
                                >
                                    Last opp video
                                </Button>
                                <UploadPostModal
                                    isOpen={isOpen}
                                    onClose={() => setIsOpen(false)}
                                    onAdded={() => {
                                        setIsOpen(false);
                                        refetch();
                                    }}
                                />
                            </>
                        )}
                        {!isAuthenticated && (
                            <>
                                <p>
                                    Du kan også laste opp video men for å gjøre
                                    det må du være logget inn.
                                </p>
                                <div>
                                    <Button
                                        tag={Link}
                                        to={`/login?redirectUrl=${
                                            location.pathname + location.search
                                        }`}
                                    >
                                        Logg inn
                                    </Button>
                                    <Button
                                        className="ml-2"
                                        tag={Link}
                                        to="/register"
                                    >
                                        Lag bruker
                                    </Button>
                                </div>
                            </>
                        )}
                    </Jumbotron>
                </Col>
            </Row>{' '}
            <Row className="justify-content-center">
                <Col md={6}>
                    {data &&
                        data.videoPosts.edges.map((edge) => {
                            const videoPost = edge.node;

                            return (
                                <StyledVideo key={edge.cursor}>
                                    <h2>{videoPost.title}</h2>
                                    <p style={{ marginTop: -10 }}>
                                        <i>
                                            <small>
                                                Publisert av{' '}
                                                {videoPost.postedBy.firstName}{' '}
                                                {videoPost.postedBy.lastName}{' '}
                                                {date.niceReadableDate(
                                                    videoPost.createdAt
                                                )}
                                            </small>
                                        </i>
                                    </p>
                                    <p>{videoPost.description}</p>
                                    <ReactPlayer
                                        url={`https://www.youtube.com/watch?v=${videoPost.youtubeVideoId}`}
                                        width="100%"
                                        controls
                                    />
                                    <div className="mt-2">
                                        {videoPost.isLikedByCurrentUser && (
                                            <>
                                                {videoPost.likesCount <= 1
                                                    ? 'Du liker det'
                                                    : `Du og ${
                                                          videoPost.likesCount -
                                                          1
                                                      } andre personer liker`}
                                            </>
                                        )}
                                        {!videoPost.isLikedByCurrentUser && (
                                            <>
                                                <Button
                                                    color="primary"
                                                    onClick={() => {
                                                        videoPostLike({
                                                            variables: {
                                                                videoPostId:
                                                                    videoPost.id,
                                                            },
                                                        }).catch((e) => {
                                                            console.log(e);
                                                        });
                                                    }}
                                                >
                                                    <i className="fa fa-thumbs-up" />{' '}
                                                    Like
                                                </Button>{' '}
                                                {videoPost.likesCount !== 0 &&
                                                    `${videoPost.likesCount} personer liker`}
                                            </>
                                        )}
                                    </div>
                                </StyledVideo>
                            );
                        })}
                    {loading && (
                        <div className="justify-content-center">
                            <Spinner />
                        </div>
                    )}
                    {error && <Alert color="danger">Noe skjedde</Alert>}
                    {fetchMore && (
                        <Button
                            className="mt-5"
                            block
                            size="lg"
                            color="primary"
                            onClick={fetchMore}
                        >
                            Last inn flere
                        </Button>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default Videos;
