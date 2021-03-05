import React from 'react';
import { Reference } from 'react-popper';
import styled from 'styled-components';
import dropDownContext from './dropDownContext';

const DropdownButton = styled.div`
    display: flex;
    border: 1px solid #cbcbcb;
    padding: 20px 20px;
    max-width: 100%;
    border-radius: 2px;
    cursor: pointer;
    justify-content: space-between;
    background-color: ${(props) =>
        props.isExpanded ? 'rgb(214,214,214)' : 'unset'};
`;

const ButtonContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const Caret = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 10px;
`;

const DropDownToggle = ({ children, custom = false, ...buttonProps }) => {
    const context = React.useContext(dropDownContext);

    if (context == null) {
        throw new Error(
            'DropDownToggle must be used within a DropDown component'
        );
    }

    const { toggle, isExpanded } = context;

    return (
        <Reference content={children}>
            {({ ref }) => (
                <div ref={ref}>
                    <DropdownButton
                        {...buttonProps}
                        isExpanded={isExpanded}
                        onClick={() => toggle()}
                    >
                        <ButtonContent>
                            {children ? children : null}
                        </ButtonContent>
                        <Caret>
                            {isExpanded ? (
                                <i className="fa fa-caret-up" />
                            ) : (
                                <i className="fa fa-caret-down" />
                            )}
                        </Caret>
                    </DropdownButton>
                </div>
            )}
        </Reference>
    );
};

export default DropDownToggle;
