import styled from 'styled-components';
import { Link } from 'react-router-dom';
import React from 'react';

export default styled(({ tag, innerRef, ...props }) => {
    const Tag = tag || Link;

    return <Tag {...props} ref={innerRef} />;
})`
    color: white;
    text-decoration: none;
    padding: 10px 20px;
    cursor: pointer;
    display: inline-block;

    &:hover,
    &.active {
        text-decoration: none;
        color: inherit;
        background-color: #55befd;
    }

    &.selected {
        background-color: #005e92;
    }

    &.tilbud {
        background-color: #d93717;
    }
`;
