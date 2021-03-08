import React from 'react';
import MobileSearch from './MobileSearch.jsx';
import { useQuery, gql } from '@apollo/client';
import { useDebounce, useLockBodyScroll } from 'moment-hooks';
import useSearchLogging from '../../../../hooks/useSearchLogging.js';
import { compactListProductFragment } from '../../../Product/CompactListProduct.jsx';
import { useHistory, useLocation } from 'react-router-dom';

const mobileSearchQuery = gql`
    query GetBrands(
        $filters: ProductFilters
        $brandFilters: BrandFilters
        $pagination: PaginationInput!
        $orderBy: String!
    ) {
        brands(filters: $brandFilters) {
            id
            name
            alias
        }
        products(
            filters: $filters
            pagination: $pagination
            orderBy: $orderBy
        ) {
            edges {
                node {
                    ...CompactListProductFragment
                }
            }
        }
    }
    ${compactListProductFragment}
`;

const DataLoader = ({ debouncedInput, children }) => {
    const { loading, data } = useQuery(mobileSearchQuery, {
        variables: {
            brandFilters: {
                search: debouncedInput,
            },
            filters: {
                search: debouncedInput,
                shouldShowPackages: true,
            },
            pagination: {
                count: 6,
            },
            orderBy: 'searchRank',
        },
    });

    return children({ loading, data });
};

const MobileSearchContainer = () => {
    const [input, setInput] = React.useState('');
    const debouncedInput = useDebounce(input, 500);

    const [expanded, setExpanded] = React.useState(false);
    const [hasFocus, setHasFocus] = React.useState(false);

    const history = useHistory();
    const location = useLocation();

    React.useEffect(() => {
        if (hasFocus) {
            setExpanded(hasFocus);
        }
    }, [hasFocus]);

    React.useEffect(() => {
        setExpanded(false);
    }, [location]);

    const isInFullScreen = expanded && input !== '';
    useLockBodyScroll(isInFullScreen);

    useSearchLogging(input);

    if (input.length === 0) {
        return (
            <MobileSearch
                loading={false}
                input={input}
                setInput={setInput}
                products={null}
                brands={null}
                hasFocus={hasFocus}
                setHasFocus={setHasFocus}
                onEnter={() => {
                    setExpanded(false);
                    setInput('');
                    history.push(`/search?q=${input}`);
                }}
            />
        );
    }

    return (
        <DataLoader debouncedInput={debouncedInput}>
            {({ data, loading }) => (
                <MobileSearch
                    loading={loading || debouncedInput !== input}
                    input={input}
                    setInput={setInput}
                    products={data && data.products.edges.map((e) => e.node)}
                    brands={data && data.brands}
                    isInFullScreen={isInFullScreen}
                    hasFocus={hasFocus}
                    setHasFocus={setHasFocus}
                    onEnter={() => {
                        setExpanded(false);
                        setInput('');
                        history.push(`/search?q=${input}`);
                    }}
                />
            )}
        </DataLoader>
    );
};

export default MobileSearchContainer;
