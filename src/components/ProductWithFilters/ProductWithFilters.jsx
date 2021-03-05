import React from 'react';
import {
    Alert,
    Col,
    Container,
    Row,
    Spinner,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';
import ProductFilters from '../ProductFilters.jsx';
import Products from '../Products/Products.jsx';

const ProductWithFilters = ({
    products,
    productFilters,
    productFiltersState,
    loading,
    error,
    fetchMore,
    loadingMore,
    listName,
    orderBy,
    setOrderBy,
    orderByOptions,
}) => {
    const currentOption = orderByOptions.find((o) => o.value === orderBy);
    return (
        <Container>
            <Row>
                <Col lg={3} md={4} sm={4}>
                    <ProductFilters
                        productFilters={productFilters}
                        state={productFiltersState}
                    />
                </Col>
                <Col lg={9} md={8} sm={8}>
                    <div className="d-flex flex-row-reverse mb-3">
                        <UncontrolledDropdown>
                            <DropdownToggle caret>
                                {currentOption && currentOption.title}
                            </DropdownToggle>
                            <DropdownMenu right>
                                {orderByOptions.map((order) => (
                                    <DropdownItem
                                        key={order.value}
                                        onClick={() => setOrderBy(order.value)}
                                    >
                                        {order.title}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </div>
                    {loading && (
                        <div className="d-flex justify-content-center">
                            <Spinner />
                        </div>
                    )}
                    {error && <Alert color="danger">Noe skjedde</Alert>}
                    <Products
                        products={products}
                        listName={listName}
                        loadMore={fetchMore}
                        loadingMore={loadingMore}
                        sm={12}
                        md={6}
                        lg={4}
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default ProductWithFilters;
