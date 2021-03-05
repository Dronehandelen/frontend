import orderStatus from '../constants/orderStatus.js';

const getOrderStatus = (order) => {
    if (
        [
            orderStatus.WAITING_BACKORDER_CONFIRMATION,
            orderStatus.WAITING_FOR_BACKORDER_PRODUCTS,
        ].indexOf(order.status) !== -1
    ) {
        return {
            text: 'Venter på restordre',
            icon: 'truck',
            color: 'yellow',
        };
    }

    if (order.status === orderStatus.WAITING_CONFIRMATION) {
        return {
            text: 'Under behandling',
            icon: 'check',
            color: 'yellow',
        };
    }

    if (order.status === orderStatus.CANCELLED) {
        return {
            text: 'kansellert',
            icon: 'times-circle-o',
            color: 'red',
        };
    }

    if (order.status !== orderStatus.DONE) {
        return {
            text: '-',
            icon: 'check',
            color: 'yellow',
        };
    }

    if (order.shippingEmailSentAt === null) {
        return {
            text: 'Sendes snart',
            icon: 'truck',
            color: 'yellow',
        };
    }

    return {
        text: 'Sendt',
        icon: 'check',
        color: 'green',
    };
};

export default getOrderStatus;
