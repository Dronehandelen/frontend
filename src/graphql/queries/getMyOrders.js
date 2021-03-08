import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';

const GET_MY_ORDERS = gql`
    query GetMyOrders {
        myUser {
            orders {
                id
                status
                totalPrice
                succeededAt
                orderProducts {
                    amount
                    price
                    product {
                        id
                        title
                    }
                }
            }
        }
    }
`;

export default () => useQuery(GET_MY_ORDERS);
