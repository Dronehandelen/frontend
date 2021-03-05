import React from 'react';
import NotFound from '../../components/NotFound.jsx';
import DefaultHookQuery from '../../containers/DefaultHookQuery.jsx';
import { Route, Switch } from 'react-router-dom';
import { useQuery } from 'react-apollo';
import ProductContainer, { getProductQuery } from './ProductContainer';
import PackageProductsContainer from './PackageProductsContainer';

const Router = ({ productId, productAlias, match }) => {
    return (
        <DefaultHookQuery
            queryHookData={useQuery(getProductQuery, {
                variables: {
                    id: productId,
                    alias: productAlias,
                },
                errorPolicy: 'all',
            })}
            handleNotFound
        >
            {({ data: productData }) => {
                if (!productData.product) {
                    return <NotFound />;
                }

                return (
                    <Switch>
                        <Route
                            exact
                            path={match.path}
                            render={() => (
                                <ProductContainer
                                    productId={productId}
                                    productAlias={productAlias}
                                />
                            )}
                        />
                        <Route
                            path={`${match.path}/pp/:packageProductAlias`}
                            render={({ match: packageMatch }) => (
                                <PackageProductsContainer
                                    match={packageMatch}
                                    parentProduct={productData.product}
                                    parentProductUrl={match.url}
                                />
                            )}
                        />
                        <NotFound />
                    </Switch>
                );
            }}
        </DefaultHookQuery>
    );
};

export default (props) => {
    const productId = props.match.params.productId;
    const productAlias = props.match.params.productAlias;

    if (productAlias) {
        return <Router {...props} productAlias={productAlias} />;
    }

    if (isNaN(productId) || parseInt(productId) < 1) {
        return <NotFound />;
    }

    return <Router {...props} productId={parseInt(productId)} />;
};
