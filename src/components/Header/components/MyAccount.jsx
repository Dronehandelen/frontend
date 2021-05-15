import React from 'react';
import {
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    UncontrolledDropdown,
} from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';
import AuthContext from '../../../contexts/auth.js';
import MobileLink from './MobileLink';
import MobileDropdownWrapper from './MobileDropdownWrapper';

export const useAccountLinks = () => {
    const { isAuthenticated, logout } = React.useContext(AuthContext);
    const history = useHistory();

    if (!isAuthenticated) {
        return [
            {
                text: 'Lag bruker',
                to: '/register',
            },
            {
                text: 'Login',
                to: '/login',
            },
        ];
    }

    return [
        {
            text: 'Min side',
            to: '/my-account',
        },
        {
            text: 'Mine ordre',
            to: '/my-account/orders',
        },
        {
            text: 'Logg ut',
            onClick: () => {
                history.push('/');
                logout();
            },
        },
    ];
};

const MyAccountDesktop = ({ onLinkClick = () => () => {} }) => {
    const { isAuthenticated, user } = React.useContext(AuthContext);
    const links = useAccountLinks();

    return (
        <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav>
                {isAuthenticated && (
                    <>
                        <span
                            className="fa fa-user-circle"
                            style={{ width: 16 }}
                        />{' '}
                        <span className="mr-2">{user.firstName}</span>
                    </>
                )}
                {!isAuthenticated && <span>Min konto</span>}
            </DropdownToggle>
            <DropdownMenu right>
                {links.map((link, index) => (
                    <DropdownItem
                        tag={link.to ? Link : 'div'}
                        to={link.to}
                        key={index}
                        onClick={() => {
                            onLinkClick('Register')();
                            link.onClick && link.onClick();
                        }}
                    >
                        {link.text}
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </UncontrolledDropdown>
    );
};

const MyAccountMobile = ({ onLinkClick = () => () => {} }) => {
    const links = useAccountLinks();

    return (
        <MobileDropdownWrapper>
            {links.map((link) => (
                <MobileLink
                    key={link.text}
                    tag={link.to ? Link : 'div'}
                    to={link.to}
                    onClick={() => {
                        onLinkClick('Register')();
                        link.onClick && link.onClick();
                    }}
                >
                    {link.text}
                </MobileLink>
            ))}
        </MobileDropdownWrapper>
    );
};

export default (props) => {
    if (props.isMobile) {
        return <MyAccountMobile {...props} />;
    }

    return <MyAccountDesktop {...props} />;
};
