import React from 'react';
import styled from 'styled-components';

const Padding = styled.div`
    padding-top: 5px;
    padding-bottom: 5px;
`;

const Input = styled(Padding)`
    border-top: 1px solid #e2e2e2;
    border-bottom: 1px solid #e2e2e2;
`;

const Button = styled(Padding)`
    background-color: #e2e2e2;
    padding-left: 15px;
    padding-right: 15px;
    cursor: pointer;
`;

const Minus = styled(Button)`
    border-bottom-left-radius: 50%;
    border-top-left-radius: 50%;
`;

const Plus = styled(Button)`
    border-bottom-right-radius: 50%;
    border-top-right-radius: 50%;
`;

const QuantityInput = ({ value, onChange, max = null }) => {
    return (
        <div className="d-flex">
            <Minus onClick={() => onChange(value - 1)}>-</Minus>
            <Input style={{ textAlign: 'center', width: 30 }}>{value}</Input>
            <Plus
                onClick={() =>
                    (!max || value + 1 <= max) && onChange(value + 1)
                }
            >
                +
            </Plus>
        </div>
    );
};

export default QuantityInput;
