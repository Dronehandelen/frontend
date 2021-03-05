import React from 'react';
import styled from 'styled-components';

const TagSelector = ({ tag, ...props }) => {
    const Tag = tag;

    return <Tag {...props} />;
};

const MobileLink = styled(TagSelector)`
    display: flex;
    justify-content: space-between;
    color: white;
    cursor: pointer;
    text-decoration: none;
    border-bottom: 1px solid white;
    padding: 10px 5px;

    :hover {
        text-decoration: none;
        color: inherit;
        background-color: rgba(255, 255, 255, 0.1);
    }
`;

export default MobileLink;
