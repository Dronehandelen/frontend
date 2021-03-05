import React from 'react';
import styled from 'styled-components';
import { Spinner } from 'reactstrap';

const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;

    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.05);
`;

const LoadingOverlay = () => {
    return (
        <Overlay>
            <Spinner />
        </Overlay>
    );
};

export default LoadingOverlay;
