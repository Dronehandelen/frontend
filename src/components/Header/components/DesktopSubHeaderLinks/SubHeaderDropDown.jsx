import React from 'react';
import { usePopper } from 'react-popper';
import SubHeaderLink from './SubHeaderLink.jsx';
import styled from 'styled-components';

const DropDown = styled.div`
    background-color: #0277bd;
    min-width: 200px;
    box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.75);
`;

const DropDownItem = styled(SubHeaderLink)`
    display: block;
    padding: 10px;
`;

const SubHeaderDropDown = ({ children, items, isOpen, setIsOpen }) => {
    const [referenceElement, setReferenceElement] = React.useState(null);
    const [popperElement, setPopperElement] = React.useState(null);
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        placement: 'bottom-start',
    });

    return (
        <div
            style={{ position: 'relative' }}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            {children({ ref: setReferenceElement })}
            {isOpen && (
                <DropDown
                    ref={setPopperElement}
                    style={{
                        ...styles.popper,
                        zIndex: 10,
                    }}
                    {...attributes.popper}
                >
                    {items.map((item) => (
                        <DropDownItem
                            key={item.to}
                            to={item.to}
                            onClick={item.onClick}
                        >
                            {item.name}
                        </DropDownItem>
                    ))}
                </DropDown>
            )}
        </div>
    );
};

export default SubHeaderDropDown;
