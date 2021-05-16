import React from 'react';
import styled from 'styled-components';
import Feed from 'react-instagram-authless-feed';
import HideErrorBoundary from './HideErrorBoundary.jsx';
import useIsDevice from '../hooks/useIsDevice.js';

const StyledFeed = styled(Feed)`
    display: flex;
    flex-wrap: wrap;

    & > * {
        padding: 10px;
        max-width: ${(props) => (props.isMobile ? 50 : 20)}%;

        & > * {
            max-width: 100%;
        }
    }
`;
const Header = styled.a`
    display: flex;
    cursor: pointer;
    text-decoration: none;
    color: inherit;

    &:hover {
        text-decoration: none;
    }

    & > * {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
`;

const InstagramFeed = () => {
    const isMobile = useIsDevice('<=', 'md');

    return (
        <HideErrorBoundary>
            <Header
                href="https://www.instagram.com/dronehandelen/"
                target="_blank"
            >
                <div>
                    <i className="fa fa-instagram fa-2x" />
                </div>
                <div className="ml-2">Dronehandelen</div>
            </Header>
            <div>
                <StyledFeed
                    isMobile={isMobile}
                    userName="dronehandelen"
                    limit={isMobile ? 4 : 10}
                />
            </div>
        </HideErrorBoundary>
    );
};

export default InstagramFeed;
