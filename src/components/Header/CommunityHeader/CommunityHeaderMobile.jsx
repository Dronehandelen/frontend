import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Brand from '../components/Brand.jsx';
import Blue from '../components/Blue.jsx';
import { ActionBar, ActionBarButton } from '../components/ActionBar.jsx';
import cn from 'classnames';
import MobileCart from '../components/MobileCart.jsx';
import MyAccount from '../components/MyAccount.jsx';

const CommunityHeaderMobile = ({ onLinkClick }) => {
    const [selectedSubMenu, setSelectedSubMenu] = React.useState(null);

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
                {selectedSubMenu === 'account' && <MyAccount isMobile />}
            </Blue>
        </div>
    );
};

export default CommunityHeaderMobile;
