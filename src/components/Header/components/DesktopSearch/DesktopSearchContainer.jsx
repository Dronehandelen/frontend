import React from 'react';
import { useDebounce, useWindowSize } from 'moment-hooks';
import { useLocation } from 'react-router-dom';

import sizeConfig from '../../../../config/size.js';
import useSearchLogging from '../../../../hooks/useSearchLogging.js';
import headerContext from '../../../../contexts/header.js';
import { useQuery, gql } from '@apollo/client';
import { compactListProductFragment } from '../../../Product/CompactListProduct.jsx';
import DesktopSearch from './DesktopSearch';

const GET_SEARCH = gql`
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
    const { loading, data } = useQuery(GET_SEARCH, {
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

const DesktopSearchContainer = () => {
    const { height: headerHeight } = React.useContext(headerContext);

    const [input, setInput] = React.useState('');
    const [expanded, setExpanded] = React.useState(false);

    const debouncedInput = useDebounce(input, 500);
    const { width } = useWindowSize();

    const location = useLocation();

    React.useEffect(() => {
        setExpanded(false);
    }, [location]);

    useSearchLogging(input);

    if (input.length === 0) {
        return (
            <DesktopSearch
                loading={false}
                data={null}
                input={input}
                setInput={setInput}
                debouncedInput={debouncedInput}
                expanded={expanded}
                headerHeight={headerHeight}
                setExpanded={setExpanded}
                sizeConfig={sizeConfig}
                width={width}
            />
        );
    }

    return (
        <DataLoader debouncedInput={debouncedInput}>
            {({ loading, data }) => (
                <DesktopSearch
                    loading={loading}
                    data={data}
                    input={input}
                    setInput={setInput}
                    debouncedInput={debouncedInput}
                    expanded={expanded}
                    headerHeight={headerHeight}
                    setExpanded={setExpanded}
                    sizeConfig={sizeConfig}
                    width={width}
                />
            )}
        </DataLoader>
    );
};

export default DesktopSearchContainer;
