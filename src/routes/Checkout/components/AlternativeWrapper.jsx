import React from 'react';
import cn from 'classnames';
import Checkbox from '../../../components/Checkbox/Checkbox.jsx';

const AlternativeWrapper = ({ title, children, onSelect, selected }) => {
    return (
        <div
            className={cn('d-flex ', {
                'mb-4': selected,
                'mb-3': !selected,
            })}
            onClick={() => !selected && onSelect()}
            style={{ cursor: !selected && 'pointer' }}
        >
            <div>
                <Checkbox checked={selected} toggle={() => {}} />
            </div>
            <div className="pl-3 flex-grow-1">
                <div className="mb-2">{title}</div>
                {selected && <div>{children}</div>}
            </div>
        </div>
    );
};

export default AlternativeWrapper;
