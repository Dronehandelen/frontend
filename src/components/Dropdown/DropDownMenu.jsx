import React from 'react';
import { Popper } from 'react-popper';
import dropDownContext from './dropDownContext';
import styled from 'styled-components';

const DropdownMenuContainer = styled.div`
    background-color: #ffffff;
    min-width: 100%;
    overflow: hidden;
    z-index: 2;
    max-height: 30vh;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.16);
`;

const DropdownMenuContent = styled.div`
    flex: 1;
    overflow-y: auto;
`;

const DropDownMenu = ({ children }) => {
    const context = React.useContext(dropDownContext);

    if (context == null) {
        throw new Error(
            'DropDownMenu must be used within a DropDown component'
        );
    }

    const { isExpanded } = context;

    if (!isExpanded) {
        return <></>;
    }

    return (
        <Popper
            placement="bottom-start"
            modifiers={[
                {
                    name: 'preventOverflow',
                    options: { padding: 0 },
                },
            ]}
        >
            {({ ref, style }) => (
                <DropdownMenuContainer ref={ref} style={style}>
                    <DropdownMenuContent>
                        {children.length === 0 && 'No items'}
                        {children}
                    </DropdownMenuContent>
                </DropdownMenuContainer>
            )}
        </Popper>
    );
};

export default DropDownMenu;
