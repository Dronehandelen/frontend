import styled from 'styled-components';
import Color from 'color';
import React from 'react';
import dropDownContext from './dropDownContext';

const highlightColor = Color('#fafbfc').darken(0.05).hex();

const StyledDropDownItem = styled.div`
    cursor: pointer;
    padding: 10px;
    width: 100%;

    &:not(:last-child) {
        border-bottom: 1px solid rgb(192, 192, 192);
    }

    &:hover {
        background-color: ${highlightColor};
    }
`;

export default ({ onClick, ...otherProps }) => {
    const context = React.useContext(dropDownContext);
    if (context == null) {
        throw new Error(
            'DropDownItem must be used within a DropDown component'
        );
    }
    const { setIsExpanded } = context;
    return (
        <StyledDropDownItem
            onClick={(e) => {
                setIsExpanded(false);
                onClick && onClick(e);
            }}
            {...otherProps}
        />
    );
};
