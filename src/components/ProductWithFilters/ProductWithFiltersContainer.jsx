import React from 'react';
import useProductsFilter from '../../hooks/useProductsFilter.js';
import useGetProductPageFiltersQuery from '../../graphql/queries/getProductPageFilters.js';
import useGetProductsQuery from '../../graphql/queries/getProducts.js';
import DefaultHookQuery from '../../containers/DefaultHookQuery.jsx';
import ProductWithFilters from './ProductWithFilters.jsx';
import { getHierarchicalCategoryName } from '../../helpers/category.js';
import useOrderBy from './useOrderBy.js';

const orderByOptions = [
    {
        title: 'Popularitet',
        value: 'popularity(desc)',
    },
    {
        title: 'Nyheter',
        value: 'createdAt(desc)',
    },
    {
        title: 'Pris lav-høy',
        value: 'price(asc)',
    },
    {
        title: 'Pris høy-lav',
        value: 'price(desc)',
    },
];

const buildCategories = (categories, ignoreFrom) => {
    return categories
        .filter((categoryInfo) => categoryInfo.category.id !== ignoreFrom)
        .map((categoryInfo) => ({
            ...categoryInfo,
            category: {
                ...categoryInfo.category,
                name: getHierarchicalCategoryName(
                    categoryInfo.category,
                    ignoreFrom
                ),
            },
        }));
};

const ProductWithFiltersContainer = ({ baseFilters, listName }) => {
    const [orderBy, setOrderBy] = useOrderBy(
        'popularity(desc)',
        orderByOptions
    );
    const [loadingMore, setLoadingMore] = React.useState(false);
    const productFiltersState = useProductsFilter(baseFilters);

    const getCategoryPageInfoQueryData = useGetProductPageFiltersQuery(
        baseFilters
    );

    const { error, loading, data, fetchMore } = useGetProductsQuery(
        {
            ...baseFilters,
            ...productFiltersState.getQueryFilters(),
            shouldShowPackages: true,
            categoryIds: undefined,
        },
        { count: 18 },
        orderBy
    );

    return (
        <DefaultHookQuery
            queryHookData={getCategoryPageInfoQueryData}
            handleNotFound
        >
            {({ data: categoryPageInfo }) => {
                return (
                    <ProductWithFilters
                        orderBy={orderBy}
                        setOrderBy={setOrderBy}
                        orderByOptions={orderByOptions}
                        listName={listName}
                        products={
                            data
                                ? data.products.edges.map((edge) => edge.node)
                                : []
                        }
                        productFilters={{
                            ...categoryPageInfo.productFilters,
                            categories: buildCategories(
                                categoryPageInfo.productFilters.categories,
                                baseFilters.categoryId || null
                            ),
                            brands: baseFilters.brandId
                                ? null
                                : categoryPageInfo.productFilters.brands,
                        }}
                        productFiltersState={productFiltersState}
                        error={error}
                        loading={loading}
                        loadingMore={loadingMore}
                        fetchMore={
                            fetchMore &&
                            (async () => {
                                setLoadingMore(true);
                                await fetchMore();
                                setLoadingMore(false);
                            })
                        }
                    />
                );
            }}
        </DefaultHookQuery>
    );
};

export default ProductWithFiltersContainer;
