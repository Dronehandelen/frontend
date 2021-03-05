import React from 'react';
import CommunityHeaderDesktop from './CommunityHeaderDesktop.jsx';
import tracking from '../../../helpers/tracking.js';
import CommunityHeaderMobile from './CommunityHeaderMobile.jsx';

const CommunityHeader = () => {
    const onLinkClick = (buttonName) => () => {
        tracking.event('Header module', `Link "${buttonName}" clicked`);
    };
    return (
        <div className="mb-3">
            <div className="d-block d-lg-none">
                <CommunityHeaderMobile onLinkClick={onLinkClick} />
            </div>
            <div className="d-none d-lg-block">
                <CommunityHeaderDesktop onLinkClick={onLinkClick} />
            </div>
        </div>
    );
};

export default CommunityHeader;
