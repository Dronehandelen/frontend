import React from 'react';
import { Navbar, Nav, NavItem, NavLink, Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import MyAccount from './components/MyAccount.jsx';
import Cart from './components/Cart.jsx';
import Search from './components/Search.jsx';
import DesktopSubHeaderLinks from './components/DesktopSubHeaderLinks';
import Brand from './components/Brand.jsx';

const ClientHeader = ({ onLinkClick, categories, brands }) => {
    return (
        <>
            <Navbar color="light" light expand="lg">
                <Container>
                    <Brand onClick={onLinkClick('logo')} />
                    <Search />
                    <Nav navbar className="ml-auto">
                        <MyAccount onLinkClick={onLinkClick} />
                        <Cart />
                    </Nav>
                </Container>
            </Navbar>
            <DesktopSubHeaderLinks
                categories={categories}
                brands={brands}
                onLinkClick={onLinkClick}
            />
        </>
    );
};

export default ClientHeader;
