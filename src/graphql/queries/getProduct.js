import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';

const GET_PRODUCT = gql`
    query GetProduct($id: Int!) {
        product(id: $id) {
            id
            type
            description
            shortDescription
            thirdPartyDescription
            expiredAt
            originalPrice
            price
            title
            isPublished
            stock
            width
            height
            depth
            weight
            warehousePlacement
            createdAt
            images {
                fileId
                url
            }
            primaryImage {
                fileId
                url
            }
            brandId
            brand {
                id
                name
            }
            gtin
            stars {
                rating
                count
            }
            reviews {
                id
                review
                stars
                createdAt
                user {
                    id
                    firstName
                    lastName
                }
            }
            relatedProducts(count: 4) {
                id
                title
                shortDescription
                originalPrice
                price
                stock
                createdAt
                primaryImage {
                    url
                }
                stars {
                    rating
                    count
                }
                brand {
                    id
                    name
                }
            }
            relatedByOrderProducts: relatedProducts(
                count: 4
                filters: { byOrderWithProduct: true }
            ) {
                id
                title
                shortDescription
                originalPrice
                price
                stock
                createdAt
                primaryImage {
                    url
                }
                stars {
                    rating
                    count
                }
                brand {
                    id
                    name
                }
            }
            questions {
                id
                user {
                    firstName
                    lastName
                }
                content
                createdAt
                answers {
                    id
                    user {
                        firstName
                        lastName
                    }
                    content
                    createdAt
                }
            }
            categories {
                id
                name
            }
            tags {
                id
                name
            }
            accessories {
                id
                title
                shortDescription
                originalPrice
                price
                stock
                createdAt
                primaryImage {
                    url
                }
                stars {
                    rating
                    count
                }
                brand {
                    id
                    name
                }
            }
            competitorPrices {
                competitorId
                price
            }
            competitorReferences {
                competitorId
                reference
            }
        }
    }
`;

export default (productId) =>
    useQuery(GET_PRODUCT, {
        variables: {
            id: productId,
        },
        errorPolicy: 'all',
    });
