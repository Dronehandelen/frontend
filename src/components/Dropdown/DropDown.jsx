import React from 'react';
import { Manager } from 'react-popper';
import dropDownContext from './dropDownContext';
import styled from 'styled-components';
import { useOutsideClick } from 'moment-hooks';

const DropdownContainer = styled.div`
    display: block;
    position: relative;
    max-width: 100%;
`;

const DropDown = ({ children, block = false }) => {
    const [isExpanded, setIsExpanded] = React.useState(false);

    const ref = React.useRef();
    useOutsideClick(ref, () => {
        isExpanded && setIsExpanded(false);
    });

    return (
        <dropDownContext.Provider
            value={{
                isExpanded,
                setIsExpanded,
                toggle: () => setIsExpanded(!isExpanded),
                block,
            }}
        >
            <Manager>
                <DropdownContainer ref={ref} block={block}>
                    {typeof children === 'function'
                        ? children({ setIsExpanded, isExpanded })
                        : children}
                </DropdownContainer>
            </Manager>
        </dropDownContext.Provider>
    );
};

export default DropDown;
