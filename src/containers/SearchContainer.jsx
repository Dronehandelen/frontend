import React from 'react';
import useGetProductsQuery from '../graphql/queries/getProducts.js';
import DefaultHookQuery from './DefaultHookQuery.jsx';

const SearchContainer = ({ query, children, count = 20 }) => {
    return (
        <DefaultHookQuery
            queryHookData={useGetProductsQuery(
                {
                    search: query,
                    shouldShowPackages: true,
                },
                {
                    count,
                },
                'searchRank'
            )}
            handleNotFound
        >
            {({ data }) =>
                children({
                    products: data.products.edges.map((edge) => edge.node),
                })
            }
        </DefaultHookQuery>
    );
};

export default SearchContainer;
