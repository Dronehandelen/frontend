import React from 'react';
import { Badge } from 'reactstrap';
import CartContext from '../../../contexts/cartContext.js';
import styled from 'styled-components';

const CardAmount = styled.div`
    position: absolute;
    top: -10px;
    right: -10px;
`;

const MobileCart = () => {
    const { getItemAmount } = React.useContext(CartContext);

    return (
        <div style={{ position: 'relative' }}>
            <i className="fa fa-shopping-cart fa-2x" />
            {getItemAmount() !== 0 && (
                <CardAmount>
                    <Badge color="info">{getItemAmount()}</Badge>
                </CardAmount>
            )}
        </div>
    );
};

export default MobileCart;
