import React from 'react';
import Orders from './Orders.jsx';
import useGetMyOrders from '../../../../../../graphql/queries/getMyOrders.js';
import DefaultHookQuery from '../../../../../../containers/DefaultHookQuery.jsx';

const OrdersContainer = props => {
    return (
        <DefaultHookQuery queryHookData={useGetMyOrders()}>
            {({ data }) => <Orders {...props} orders={data.myUser.orders} />}
        </DefaultHookQuery>
    );
};

export default OrdersContainer;
