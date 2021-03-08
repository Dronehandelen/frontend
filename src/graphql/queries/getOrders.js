import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';

const QUERY = gql`
    query GetOrders($filters: OrderFilters, $pagination: PaginationInput!) {
        orders(filters: $filters, pagination: $pagination) {
            pageInfo {
                endCursor
                hasNextPage
            }
            edges {
                node {
                    id
                    status
                    firstName
                    lastName
                    totalPrice
                    succeededAt
                    packageReceivedAt
                    paymentMethod
                    createdAt
                    shippingEmailSentAt
                    deliveryType
                    deliveryInfo {
                        bring {
                            type
                            postalOfficeId
                            trackingCode
                            shippingLabel
                        }
                    }
                }
            }
        }
    }
`;

export default (
    filters = {
        onlyUnfinished: true,
    },
    pagination = { count: 10 }
) => {
    const data = useQuery(QUERY, {
        variables: {
            filters,
            pagination,
        },
    });

    let fetchMore = null;

    if (data.data && data.data.orders.pageInfo.hasNextPage) {
        fetchMore = async () => {
            await data.fetchMore({
                variables: {
                    pagination: {
                        ...pagination,
                        after: data.data.orders.pageInfo.endCursor,
                    },
                },
                updateQuery: (prev, { fetchMoreResult }) => {
                    if (!fetchMoreResult) return prev;
                    return {
                        ...prev,
                        orders: {
                            ...prev.orders,
                            pageInfo: fetchMoreResult.orders.pageInfo,
                            edges: [
                                ...prev.orders.edges,
                                ...fetchMoreResult.orders.edges,
                            ],
                        },
                    };
                },
            });
        };
    }

    return {
        ...data,
        fetchMore,
    };
};
