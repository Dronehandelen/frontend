import React, { useState } from 'react';
import cn from 'classnames';
import { useLocation, useHistory } from 'react-router-dom';
import MobileSearch from './components/MobileSearch';
import MobileLinksDropdown from './components/MobileLinksDropdown.jsx';
import MyAccount from './components/MyAccount';
import Brand from './components/Brand.jsx';
import { ActionBar, ActionBarButton } from './components/ActionBar.jsx';
import MobileCart from './components/MobileCart.jsx';
import Blue from './components/Blue.jsx';

const ClientHeader = ({ onLinkClick, categories, brands }) => {
    const [selectedSubMenu, setSelectedSubMenu] = useState(null);

    let location = useLocation();
    let history = useHistory();

    React.useEffect(() => {
        setSelectedSubMenu(null);
    }, [location.pathname, setSelectedSubMenu]);

    const toggleSubMenu = (name) => () => {
        setSelectedSubMenu(selectedSubMenu === name ? null : name);
    };

    return (
        <div>
            <Brand onClick={onLinkClick('logo')} isMobile />
            <Blue>
                <ActionBar>
                    <ActionBarButton
                        onClick={toggleSubMenu('categories')}
                        className={cn({
                            selected: selectedSubMenu === 'categories',
                        })}
                    >
                        <i className="fa fa-bars fa-2x" />
                    </ActionBarButton>
                    <ActionBarButton
                        onClick={toggleSubMenu('search')}
                        className={cn({
                            selected: selectedSubMenu === 'search',
                        })}
                    >
                        <i className="fa fa-search fa-2x" />
                    </ActionBarButton>
                    <ActionBarButton
                        onClick={toggleSubMenu('account')}
                        className={cn({
                            selected: selectedSubMenu === 'account',
                        })}
                    >
                        <i className="fa fa-user-circle fa-2x" />
                    </ActionBarButton>
                    <ActionBarButton onClick={() => history.push('/cart')}>
                        <MobileCart />
                    </ActionBarButton>
                </ActionBar>
                {selectedSubMenu === 'search' && <MobileSearch />}
                {selectedSubMenu === 'categories' && (
                    <MobileLinksDropdown
                        brands={brands}
                        categories={categories}
                        onLinkClick={onLinkClick}
                        onClose={() => setSelectedSubMenu(null)}
                    />
                )}
                {selectedSubMenu === 'account' && <MyAccount isMobile />}
            </Blue>
        </div>
    );
};

export default ClientHeader;
