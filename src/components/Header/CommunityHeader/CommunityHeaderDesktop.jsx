import React from 'react';
import { Container, Nav, Navbar } from 'reactstrap';
import Brand from '../components/Brand.jsx';
import MyAccount from '../components/MyAccount.jsx';
import Cart from '../components/Cart.jsx';

const CommunityHeaderDesktop = ({ onLinkClick }) => {
    return (
        <Navbar color="light" light expand="lg">
            <Container>
                <Brand onClick={onLinkClick('logo')} />
                <Nav navbar className="ml-auto">
                    <MyAccount onLinkClick={onLinkClick} />
                    <Cart />
                </Nav>
            </Container>
        </Navbar>
    );
};

export default CommunityHeaderDesktop;
