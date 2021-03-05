import React from 'react';
import useGetBrandQuery from '../../graphql/queries/getBrand.js';
import NotFound from '../../components/NotFound.jsx';
import DefaultHookQuery from '../../containers/DefaultHookQuery.jsx';
import { Link, Route, Switch } from 'react-router-dom';
import Product from '../Product';
import productContext from '../../contexts/product.js';
import { BreadcrumbItem } from 'reactstrap';
import BrandContainer from './BrandContainer.jsx';

const Router = ({ brandId, brandAlias, match }) => {
    return (
        <DefaultHookQuery
            queryHookData={useGetBrandQuery(brandId, brandAlias)}
            handleNotFound
        >
            {({ data }) => {
                if (!data.brand) {
                    return <NotFound />;
                }

                return (
                    <productContext.Provider
                        value={{
                            basePath: `/b/${data.brand.alias}`,
                            extraBreadcrumb: (
                                <>
                                    <BreadcrumbItem>
                                        <Link to={`/b/${data.brand.alias}`}>
                                            {data.brand.name}
                                        </Link>
                                    </BreadcrumbItem>
                                </>
                            ),
                        }}
                    >
                        <Switch>
                            <Route
                                exact
                                path={match.path}
                                render={(mathProps) => (
                                    <BrandContainer
                                        {...mathProps}
                                        brand={data.brand}
                                    />
                                )}
                            />
                            <Route
                                path={`${match.path}/products/:productId`}
                                component={Product}
                            />
                            <Route
                                path={`${match.path}/p/:productAlias`}
                                component={Product}
                            />
                            <NotFound />
                        </Switch>
                    </productContext.Provider>
                );
            }}
        </DefaultHookQuery>
    );
};

export default (props) => {
    const brandId = props.match.params.brandId;
    const brandAlias = props.match.params.brandAlias;

    if (brandAlias) {
        return <Router {...props} brandAlias={brandAlias} />;
    }

    if (isNaN(brandId) || parseInt(brandId) < 1) {
        return <NotFound />;
    }

    return <Router {...props} brandId={parseInt(brandId)} />;
};
