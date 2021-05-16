import React from 'react';
import styled from 'styled-components';
import appConfig from '../config/app';

const Styled = styled.a`
    background-color: #4080ff;
    border: 1px solid #4080ff;
    color: white;
    border-radius: 4px;
    font-size: 13px;
    padding: 6px 8px;
    cursor: pointer;

    &:hover {
        color: inherit;
        text-decoration: none;
    }

    & > i {
        margin-right: 5px;
    }
`;

const FbLike = () => {
    return (
        <Styled
            href={appConfig.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
        >
            <i className="fa fa-thumbs-up" />
            Like
        </Styled>
    );
};

export default FbLike;
