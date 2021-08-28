import React from 'react';
import { useSize } from 'moment-hooks';
import tracking from '../../helpers/tracking';
import ClientMobileHeader from './ClientMobileHeader';
import ClientDesktopHeader from './ClientDesktopHeader';
import headerContext from '../../contexts/header.js';
import Sales from '../../routes/Home/Sales';

const ClientHeader = ({ data }) => {
    const ref = React.useRef();
    const { height } = useSize(ref);
    const onLinkClick = (buttonName) => () => {
        tracking.event('Header module', `Link "${buttonName}" clicked`);
    };

    const sort = (a, b) => {
        if (a.dynamicOrder === b.dynamicOrder) {
            return 0;
        }

        if (a.dynamicOrder && b.dynamicOrder) {
            if (a.dynamicOrder < b.dynamicOrder) {
                return -1;
            }

            return 1;
        }

        if (!a.dynamicOrder) {
            return 1;
        }

        return -1;
    };

    const setupCategories = (categories) =>
        categories
            .filter((c) => c.displayInHeader)
            .sort(sort)
            .map((c) => ({
                ...c,
                childCategories: c.childCategories
                    ? setupCategories(c.childCategories)
                    : [],
            }));

    const categories = data ? setupCategories(data.categories) : [];

    const brands = data
        ? data.brands.sort((a, b) => a.name.localeCompare(b.name))
        : [];

    return (
        <headerContext.Provider
            value={{
                height,
            }}
        >
            <div className="mb-3" ref={ref}>
                <Sales />
                <div className="d-block d-lg-none">
                    <ClientMobileHeader
                        onLinkClick={onLinkClick}
                        categories={categories}
                        brands={brands}
                    />
                </div>
                <div className="d-none d-lg-block">
                    <ClientDesktopHeader
                        onLinkClick={onLinkClick}
                        categories={categories}
                        brands={brands}
                    />
                </div>
            </div>
        </headerContext.Provider>
    );
};

export default ClientHeader;
