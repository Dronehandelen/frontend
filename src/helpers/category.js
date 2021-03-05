export const getHierarchicalCategoryName = (category, ignoreFrom = null) => {
    const getName = (category, result = []) => {
        const ignore = category.id === ignoreFrom;

        if (!ignore) {
            result.unshift(category.name);

            if (category.parentCategory) {
                return getName(category.parentCategory, result);
            }
        }

        return result.join(' > ');
    };

    return getName(category);
};
