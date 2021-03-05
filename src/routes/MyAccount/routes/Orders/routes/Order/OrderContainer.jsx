import React from 'react';
import Order from '../../../../../../components/Order';
import useGetOrderQuery from '../../../../../../graphql/queries/getOrder.js';
import DefaultHookQuery from '../../../../../../containers/DefaultHookQuery.jsx';
import { Breadcrumb, BreadcrumbItem, Col, Container, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import appConfig from '../../../../../../config/app.js';

const OrderContainer = (props) => {
    return (
        <DefaultHookQuery
            queryHookData={useGetOrderQuery(
                parseInt(props.match.params.orderId)
            )}
        >
            {({ data }) => (
                <>
                    <Container>
                        <Row>
                            <Col>
                                <Breadcrumb>
                                    <BreadcrumbItem>
                                        <Link to="/">{appConfig.appName}</Link>
                                    </BreadcrumbItem>
                                    <BreadcrumbItem>
                                        <Link to="/my-account">Min side</Link>
                                    </BreadcrumbItem>
                                    <BreadcrumbItem>
                                        <Link to="/my-account/orders">
                                            Ordre
                                        </Link>
                                    </BreadcrumbItem>
                                    <BreadcrumbItem active>
                                        {data.order.id}
                                    </BreadcrumbItem>
                                </Breadcrumb>
                            </Col>
                        </Row>
                    </Container>
                    <Order {...props} order={data.order} />
                </>
            )}
        </DefaultHookQuery>
    );
};

export default OrderContainer;
