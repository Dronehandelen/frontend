import { useMutation } from 'react-apollo';
import gql from 'graphql-tag';

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
