import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';

const GET_ORDER = gql`
    query GetOrder($id: Int!) {
        order(id: $id) {
            id
            status
            totalPrice
            shippingPrice
            succeededAt
            phone
            email
            firstName
            lastName
            shippingEmailSentAt
            packageReceivedAt
            paymentMethod
            orderProducts {
                amount
                price
                product {
                    id
                    alias
                    shortDescription
                    price
                    title
                    width
                    height
                    depth
                    weight
                    warehousePlacement
                    images {
                        fileId
                        url
                    }
                    primaryImage {
                        fileId
                        url
                    }
                }
            }
            address {
                id
                address
                postalCode
                postalPlace
                country
                co
            }
            receipt {
                url
            }
            packingList {
                url
            }
            deliveryType
            deliveryInfo {
                deliveryTypeInfo {
                    id
                    name
                }
                bring {
                    typeInfo {
                        id
                        name
                    }
                    postalOfficeId
                    trackingCode
                    shippingLabel
                }
            }
        }
    }
`;

export default (id) => useQuery(GET_ORDER, { variables: { id } });
