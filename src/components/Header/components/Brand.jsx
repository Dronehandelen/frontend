import React from 'react';
import styled from 'styled-components';
import { NavbarBrand } from 'reactstrap';
import { Link } from 'react-router-dom';

const DesktopBrand = styled(NavbarBrand)`
    > img {
        max-width: 250px;
    }
`;

const MobileBrand = styled(Link)`
    width: 100%;
    text-align: center;
    display: inline-block;
    padding: 10px;

    > img {
        max-width: 200px;
    }
`;

const Brand = ({ onClick, to = '/', isMobile, imgSrc = '/logo-black.png' }) => {
    if (isMobile) {
        return (
            <MobileBrand tag={Link} to={to} onClick={onClick}>
                <img src={imgSrc} alt="" />
            </MobileBrand>
        );
    }

    return (
        <DesktopBrand tag={Link} to={to} onClick={onClick}>
            <img src={imgSrc} alt="" />
        </DesktopBrand>
    );
};

export default Brand;
