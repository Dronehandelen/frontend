import React from 'react';
import { Badge, NavItem, NavLink } from 'reactstrap';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import CartContext from '../../../contexts/cartContext.js';
import tracking from '../../../helpers/tracking';

const CountWrapper = styled.span`
    display: inline-block;
    width: 20px;
`;

const Cart = () => {
    const { getItemAmount } = React.useContext(CartContext);

    const cartItemAmount = getItemAmount();

    return (
        <NavItem>
            <div>
                <NavLink
                    tag={Link}
                    to="/cart"
                    onClick={() =>
                        tracking.event('Header module', 'Cart icon clicked')
                    }
                >
                    <span
                        className="fa fa-shopping-cart"
                        style={{ width: 15 }}
                    />
                    <span className="d-lg-none ml-1">Handlevogn</span>
                    <CountWrapper>
                        {cartItemAmount !== 0 && (
                            <Badge color="info" className="ml-1">
                                {cartItemAmount}
                            </Badge>
                        )}
                    </CountWrapper>
                </NavLink>
            </div>
        </NavItem>
    );
};

export default Cart;
