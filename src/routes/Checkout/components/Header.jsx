import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const DesktopBrand = styled.div`
    background-color: #0277bd;
    padding: 30px 20px;
    display: flex;
    justify-content: space-between;

    > * {
        flex: 1;
    }

    .link {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    a,
    a:hover {
        text-decoration: none;
        color: white;
    }

    img {
        width: 250px;
        max-width: 100%;
    }
`;

const Header = () => {
    return (
        <DesktopBrand>
            <div className="link">
                <Link to="/cart">
                    <span className="d-inline d-md-none">
                        <i className="fa fa-shopping-cart fa-2x" />
                    </span>
                    <span className="d-none d-md-inline">
                        <i className="fa fa-chevron-left mr-1" />
                        Til handlevognen
                    </span>
                </Link>
            </div>
            <div className="text-center">
                <img src="/logo.png" alt="" />
            </div>
            <div />
        </DesktopBrand>
    );
};

export default Header;
