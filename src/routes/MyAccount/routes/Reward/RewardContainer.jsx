import React from 'react';
import Reward from './Reward.jsx';
import { gql } from '@apollo/client';
import usePaginatedQuery from '../../../../hooks/usePaginatedQuery.js';

const latestEarnedRewardsQuery = gql`
    query GetLatestEarnedRewards($pagination: PaginationInput!) {
        myUser {
            latestEarnedRewards(pagination: $pagination) {
                edges {
                    node {
                        id
                        amount
                        earnedAt
                        rewardPointActionId
                    }
                }
                pageInfo {
                    hasNextPage
                    endCursor
                }
            }
        }
    }
`;

const RewardContainer = () => {
    const lastEarnedRewardsData = usePaginatedQuery(
        latestEarnedRewardsQuery,
        'myUser.latestEarnedRewards',
        {},
        { count: 5 }
    );

    return <Reward lastEarnedRewardsData={lastEarnedRewardsData} />;
};

export default RewardContainer;
