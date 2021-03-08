import React from 'react';
import { Navbar, Nav, Container } from 'reactstrap';
import MyAccount from './components/MyAccount.jsx';
import Cart from './components/Cart.jsx';
import DesktopSubHeaderLinks from './components/DesktopSubHeaderLinks';
import Brand from './components/Brand.jsx';
import DesktopSearch from './components/DesktopSearch';

const ClientHeader = ({ onLinkClick, categories, brands }) => {
    return (
        <>
            <Navbar color="light" light expand="lg">
                <Container>
                    <Brand onClick={onLinkClick('logo')} />
                    <DesktopSearch />
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
