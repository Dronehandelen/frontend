import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';

const QUERY = gql`
    query Stats(
        $from: DateTime!
        $to: DateTime!
        $fromPrevious: DateTime!
        $toPrevious: DateTime!
    ) {
        stats {
            currentPeriod: period(from: $from, to: $to) {
                turnover
                orderCount
                userRegistrationCount
                uniqueUsers
                uniqueTrackingUsers
                productEventsCount(eventName: "view")
                productViewsCountPerDay: productEventsCountPerDay(
                    eventName: "view"
                ) {
                    date
                    count
                }
                productClickCountPerDay: productEventsCountPerDay(
                    eventName: "click"
                ) {
                    date
                    count
                }
                mostPopularProducts {
                    views
                    product {
                        id
                        title
                    }
                }
                productWishLikes {
                    likedAt
                    user {
                        firstName
                        lastName
                    }
                    productWish {
                        id
                        productName
                    }
                }
            }
            previousPeriod: period(from: $fromPrevious, to: $toPrevious) {
                turnover
                orderCount
                userRegistrationCount
                uniqueUsers
                uniqueTrackingUsers
                productEventsCount(eventName: "view")
            }
        }
    }
`;

export default (from, to) => {
    const diff = Math.abs(from.diff(to, 'seconds'));

    return useQuery(QUERY, {
        variables: {
            from,
            to,
            fromPrevious: from.clone().subtract(diff, 'seconds'),
            toPrevious: from,
        },
    });
};
