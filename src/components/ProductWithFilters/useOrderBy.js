import React from 'react';
import store from 'store';

export default (defaultOrderBy = 'popularity(desc)', possibleOrderBys) => {
    const [orderBy, setOrderBy] = React.useState(() => {
        const lastOrderBy = store.get('lastProductListOrderBy');
        return lastOrderBy ? lastOrderBy : defaultOrderBy;
    });

    React.useEffect(() => {
        if (!possibleOrderBys.some((option) => option.value === orderBy)) {
            setOrderBy(defaultOrderBy);
        } else {
            store.set(
                'lastProductListOrderBy',
                orderBy,
                new Date().getTime() + 1000 * 60 * 60
            );
        }
    }, [defaultOrderBy, possibleOrderBys, orderBy]);

    return [orderBy, setOrderBy];
};
