import React from 'react';
import useArray from './useArray.js';
import * as store from 'store';

const getStoreKey = (baseFilters) => JSON.stringify(baseFilters);
export default (baseFilters = {}) => {
    const defaultValues = React.useMemo(() => {
        return {
            tagIds: [],
            brandIds: [],
            categoryIds: [],
            ...store.get(getStoreKey(baseFilters)),
        };
    }, [baseFilters]);

    const tagIds = useArray(defaultValues.tagIds);
    const brandIds = useArray(defaultValues.brandIds);
    const categoryIds = useArray(defaultValues.categoryIds);

    React.useEffect(() => {
        store.set(
            getStoreKey(baseFilters),
            {
                tagIds: tagIds.value,
                brandIds: brandIds.value,
                categoryIds: categoryIds.value,
            },
            new Date().getTime() + 1000 * 60 * 60
        );
    }, [tagIds, brandIds, categoryIds]);

    return React.useMemo(() => {
        return {
            __productFilterState: true,
            tagIds,
            brandIds,
            categoryIds,
            getQueryFilters: () => {
                return {
                    categories:
                        categoryIds.value.length !== 0
                            ? categoryIds.value
                            : baseFilters.categoryIds &&
                              baseFilters.categoryIds.length !== 0
                            ? baseFilters.categoryIds
                            : [],
                    tagIds: tagIds.value,
                    brandIds:
                        brandIds.value.length !== 0
                            ? brandIds.value
                            : baseFilters.brandIds &&
                              baseFilters.brandIds.length !== 0
                            ? baseFilters.brandIds
                            : [],
                };
            },
        };
    }, [tagIds, brandIds, categoryIds, baseFilters]);
};
