import React from 'react';
import { BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import ProductContainer from './ProductContainer';
import productContext from '../../contexts/product';

const PackageProductsContainer = ({
    match,
    parentProduct,
    parentProductUrl,
}) => {
    const { basePath, extraBreadcrumb } = React.useContext(productContext);

    return (
        <productContext.Provider
            value={{
                basePath,
                extraBreadcrumb: (
                    <>
                        {extraBreadcrumb}
                        <BreadcrumbItem>
                            <Link to={parentProductUrl}>
                                {parentProduct.title}
                            </Link>
                        </BreadcrumbItem>
                    </>
                ),
            }}
        >
            <ProductContainer productAlias={match.params.packageProductAlias} />
        </productContext.Provider>
    );
};

export default PackageProductsContainer;
