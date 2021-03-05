import React from 'react';
import useGetCategoryQuery from '../../graphql/queries/getCategory.js';
import NotFound from '../../components/NotFound.jsx';
import DefaultHookQuery from '../../containers/DefaultHookQuery.jsx';
import { Link, Route, Switch } from 'react-router-dom';
import ProductCategoryContainer from './ProductCategoryContainer.jsx';
import Product from '../Product';
import productContext from '../../contexts/product.js';
import { BreadcrumbItem } from 'reactstrap';

const Router = ({ categoryId, categoryAlias, match }) => {
    return (
        <DefaultHookQuery
            queryHookData={useGetCategoryQuery(categoryId, categoryAlias)}
            handleNotFound
        >
            {({ data: category }) => {
                if (!category.category) {
                    return <NotFound />;
                }

                return (
                    <productContext.Provider
                        value={{
                            basePath: `/c/${category.category.alias}`,
                            extraBreadcrumb: (
                                <>
                                    {category.category.parentCategory && (
                                        <BreadcrumbItem>
                                            <Link
                                                to={`/c/${category.category.parentCategory.alias}`}
                                            >
                                                {
                                                    category.category
                                                        .parentCategory.name
                                                }
                                            </Link>
                                        </BreadcrumbItem>
                                    )}
                                    <BreadcrumbItem>
                                        <Link
                                            to={`/c/${category.category.alias}`}
                                        >
                                            {category.category.name}
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
                                    <ProductCategoryContainer
                                        {...mathProps}
                                        category={category.category}
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
    const categoryId = props.match.params.categoryId;
    const categoryAlias = props.match.params.categoryAlias;

    if (categoryAlias) {
        return <Router {...props} categoryAlias={categoryAlias} />;
    }

    if (isNaN(categoryId) || parseInt(categoryId) < 1) {
        return <NotFound />;
    }

    return <Router {...props} categoryId={parseInt(categoryId)} />;
};
