import React from 'react';
import styled from 'styled-components';

const StyledProductStockStatus = styled.div`
    display: flex;
    font-size: 0.9em;

    & > * {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
`;

const Square = styled.div`
    width: 15px;
    height: 15px;

    &.red {
        background-color: red;
    }

    &.yellow {
        background-color: #ffdf00;
    }

    &.green {
        background-color: #01c200;
    }
`;

const useGetInfo = (stock, countAvailableForBackorder, backorderMessage) => {
    if (stock > 0) {
        return {
            color: 'green',
            message: `${stock} stk. på lager`,
        };
    }

    if (countAvailableForBackorder > 0) {
        return {
            color: 'yellow',
            message: `Ikke på lager. ${backorderMessage}`,
        };
    }

    return {
        color: 'red',
        message: `Ikke på lager`,
    };
};

const ProductStockStatus = ({
    stock,
    countAvailableForBackorder,
    backorderMessage,
    className,
}) => {
    const info = useGetInfo(
        stock,
        countAvailableForBackorder,
        backorderMessage
    );

    return (
        <StyledProductStockStatus className={className}>
            <div>
                <Square className={info.color} />
            </div>
            <div className="ml-2">{info.message}</div>
        </StyledProductStockStatus>
    );
};

export default ProductStockStatus;
