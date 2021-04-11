import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import tracking from '../../../../../helpers/tracking.js';

const StyledRow = styled(Link)`
    padding: 10px 15px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    color: inherit;
    text-decoration: none;

    &:hover,
    &.active {
        text-decoration: none;
        color: inherit;
    }

    &:hover {
        background-color: rgba(0, 0, 0, 0.1);
    }
`;

const Row = ({
    children,
    hasSubCategory,
    to,
    onExpandChildCategories,
    categoryId,
}) => {
    const [isHovered, setIsHovered] = React.useState(false);

    React.useEffect(() => {
        if (!isHovered || !hasSubCategory) {
            return;
        }

        const timeout = setTimeout(() => {
            onExpandChildCategories();
        }, 300);

        return () => clearTimeout(timeout);
    }, [isHovered]);

    return (
        <StyledRow
            to={to}
            onClick={() => tracking.categoryEvent(categoryId, 'click')}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false);
            }}
        >
            <div>{children}</div>
            {hasSubCategory && (
                <div>
                    <i className="fa fa-angle-right" />
                </div>
            )}
        </StyledRow>
    );
};

export default Row;
