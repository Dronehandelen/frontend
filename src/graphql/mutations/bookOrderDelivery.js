import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';

const QUERY = gql`
    mutation BookOrderDelivery(
        $orderId: Int!
        $shippingInfo: ShippingInfoInput!
        $packageInfo: PackageInfoInput!
    ) {
        bookOrderDelivery(
            orderId: $orderId
            shippingInfo: $shippingInfo
            packageInfo: $packageInfo
        )
    }
`;

export default () => useMutation(QUERY);
