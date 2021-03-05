import React from 'react';
import { Input, Spinner } from 'reactstrap';
import { Popover } from 'reactstrap';
import { useDebounce, useWindowSize } from 'moment-hooks';
import { Link, useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import sizeConfig from '../../../config/size.js';
import useSearchLogging from '../../../hooks/useSearchLogging.js';
import headerContext from '../../../contexts/header.js';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import CompactListProduct, {
    compactListProductFragment,
} from '../../Product/CompactListProduct.jsx';

const StyledPopover = styled(Popover)`
    .popover {
        max-width: 800px;
        width: 100%;
    }
`;

const Wrapper = styled.div`
    padding: 10px;
    display: flex;

    & > *:first-child {
        flex: 1;
    }
    & > *:not(:first-child) {
        flex: 0.5;
    }
`;

const OtherSearchZone = styled.div`
    background-color: rgba(0, 0, 0, 0.1);
    padding: 10px;
    display: flex;

    & > * {
        flex: 1;
    }
`;

const SearchTitle = styled.div`
    font-weight: bold;
    font-size: 1.2em;
    margin-bottom: 10px;
`;

const Brand = styled(Link)`
    cursor: pointer;
    text-decoration: none;
    color: inherit;
    padding: 5px 0;
    display: block;

    &:hover {
        text-decoration: none;
        color: inherit;
    }
`;

const Background = styled.div`
    position: fixed;
    left: 0;
    top: ${(props) => props.top}px;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 10;
`;

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

const Search = () => {
    const ref = React.useRef();
    const { height: headerHeight } = React.useContext(headerContext);

    const [input, setInput] = React.useState('');
    const [expanded, setExpanded] = React.useState(false);

    const debouncedInput = useDebounce(input, 500);
    const { width } = useWindowSize();

    const history = useHistory();
    const location = useLocation();

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

    React.useEffect(() => {
        setExpanded(false);
    }, [location]);

    useSearchLogging(input);

    return (
        <div className="ml-4 d-none d-md-block" ref={ref}>
            <Input
                id="header-search"
                placeholder="Søk for produkter..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                    if (input.length !== 0 && e.key === 'Enter') {
                        setExpanded(false);
                        history.push(`/search?q=${input}`);
                    }
                }}
                bsSize="sm"
                style={{ width: 350 }}
                onFocus={() => setExpanded(true)}
            />
            {debouncedInput !== '' && width >= sizeConfig.md && (
                <>
                    {expanded && (
                        <Background
                            onClick={() => setExpanded(false)}
                            top={headerHeight}
                        />
                    )}
                    <StyledPopover
                        placement="bottom"
                        isOpen={expanded}
                        target="header-search"
                    >
                        <Wrapper>
                            <div className="p-1">
                                <SearchTitle>Produkter</SearchTitle>
                                <div>
                                    {loading && <Spinner size="sm" />}
                                    {!loading &&
                                        data &&
                                        data.products.edges.length === 0 &&
                                        'Ingen resultater'}
                                    {!loading &&
                                        data &&
                                        data.products.edges.map(
                                            ({ node: product }) => (
                                                <CompactListProduct
                                                    key={product.id}
                                                    product={product}
                                                />
                                            )
                                        )}
                                </div>
                            </div>
                            <OtherSearchZone>
                                <div>
                                    <SearchTitle>Merker</SearchTitle>
                                    {loading && <Spinner size="sm" />}
                                    {!loading &&
                                        data &&
                                        data.brands.length === 0 &&
                                        'Ingen resultater'}
                                    {!loading &&
                                        data &&
                                        data.brands.map((brand) => (
                                            <Brand
                                                key={brand.id}
                                                to={'/b/' + brand.alias}
                                                className="btn-link"
                                            >
                                                {brand.name}
                                            </Brand>
                                        ))}
                                </div>
                            </OtherSearchZone>
                        </Wrapper>
                    </StyledPopover>
                </>
            )}
        </div>
    );
};

export default Search;
