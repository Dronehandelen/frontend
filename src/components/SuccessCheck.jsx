import React from 'react';
import styled from 'styled-components';

const Icon = styled.div`
    display: inline-block;
    background-color: #609726;
    color: white;
    padding: ${(props) => props.sizeRem * 10}px
        ${(props) => props.sizeRem * 12}px;
    border-radius: 50%;
    font-size: ${(props) => props.sizeRem}rem;
`;

const SuccessCheck = ({ sizeRem = 2 }) => {
    return (
        <Icon sizeRem={sizeRem}>
            <i className="fa fa-check fa-2x" />
        </Icon>
    );
};

export default SuccessCheck;
