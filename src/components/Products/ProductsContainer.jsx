import React from 'react';
import Products from './Products.jsx';
import useGetProducts from '../../graphql/queries/getProducts.js';
import DefaultHookQuery from '../../containers/DefaultHookQuery.jsx';

const ProductsContainer = ({
    brandIds = [],
    tagIds = [],
    categoryIds = [],
    listOffersOnly = false,
    onlyWished = false,
    onlyInStock = false,
    onlyAvailableForOrder = false,
    listName = null,
    pagination = true,
    shouldShowPackages = true,
    orderBy = 'popularity',
    pageSize = 20,
    children,
}) => {
    const [loadingMore, setLoadingMore] = React.useState(false);

    return (
        <DefaultHookQuery
            queryHookData={useGetProducts(
                {
                    categories: categoryIds,
                    listOffersOnly,
                    tagIds,
                    brandIds,
                    onlyWished,
                    onlyInStock,
                    shouldShowPackages,
                    onlyAvailableForOrder,
                },
                { count: pageSize },
                orderBy
            )}
        >
            {({ data, fetchMore }) => (
                <Products
                    products={data.products.edges.map((edge) => edge.node)}
                    listName={listName}
                    loadMore={
                        pagination && fetchMore
                            ? async () => {
                                  setLoadingMore(true);
                                  await fetchMore();
                                  setLoadingMore(false);
                              }
                            : null
                    }
                    loadingMore={loadingMore}
                    children={children}
                />
            )}
        </DefaultHookQuery>
    );
};

export default ProductsContainer;
