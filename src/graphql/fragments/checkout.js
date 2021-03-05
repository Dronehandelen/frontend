export default `
    email
    paymentMethod
    checkoutProducts {
        amount
        price
        product {
            id
            shortDescription
            price
            title
            isPublished
            stock
            primaryImage {
                fileId
                url
            }
        }
    }
    totalPrice
    shippingPrice
    stripePaymentIntent {
      clientSecret
    }
    postalOffice {
      id
      name
    }
    deliveryType
    deliveryInfo {
      firstName
      lastName
      phone
      address {
        address
        postalCode
        postalPlace
        co
      }
    }
`;
