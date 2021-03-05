import React from 'react';
import styled from 'styled-components';
import {
    Breadcrumb,
    BreadcrumbItem,
    Col,
    Container,
    Row,
    Table,
} from 'reactstrap';
import Date from '../../../../../../helpers/date.js';
import formatPrice from '../../../../../../helpers/formatPrice.js';
import { Link } from 'react-router-dom';
import appConfig from '../../../../../../config/app.js';
import getOrderStatus from '../../../../../../helpers/order.js';

const StyledRow = styled.tr`
    cursor: pointer;

    &.green i {
        color: green;
    }

    &.yellow i {
        color: #856404;
    }

    &.red i {
        color: #721c24;
    }
`;

const Orders = ({ orders, history, match }) => {
    return (
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
                        <BreadcrumbItem active>Ordre</BreadcrumbItem>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h1>Mine ordre</h1>
                    <Table hover>
                        <thead>
                            <tr>
                                <th>Dato bestilt</th>
                                <th>Status</th>
                                <th>Ordrenummer</th>
                                <th>Varer</th>
                                <th>Totalt</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => {
                                const orderStatus = getOrderStatus(order);
                                return (
                                    <StyledRow
                                        key={order.id}
                                        onClick={() =>
                                            history.push(
                                                `${match.path}/${order.id}`
                                            )
                                        }
                                        className={orderStatus.color}
                                    >
                                        <td>
                                            {Date.niceDate(order.succeededAt)}
                                        </td>
                                        <td>
                                            <i
                                                className={`fa fa-${orderStatus.icon} mr-1`}
                                            />
                                            {orderStatus.text}
                                        </td>
                                        <td>{order.id}</td>
                                        <td>
                                            {order.orderProducts.map(
                                                (orderProduct) => (
                                                    <div
                                                        className="mb-1"
                                                        key={
                                                            orderProduct.product
                                                                .id
                                                        }
                                                    >
                                                        {
                                                            orderProduct.product
                                                                .title
                                                        }{' '}
                                                        ({orderProduct.amount}{' '}
                                                        stk.)
                                                    </div>
                                                )
                                            )}
                                        </td>
                                        <td>{formatPrice(order.totalPrice)}</td>
                                    </StyledRow>
                                );
                            })}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};

export default Orders;
