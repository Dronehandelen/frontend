import React from 'react';
import { Input, Popover, Spinner } from 'reactstrap';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import CompactListProduct from '../../../Product/CompactListProduct';
import tracking from '../../../../helpers/tracking.js';

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
    margin-bottom: 5px;
`;

const SimpleLink = styled(Link)`
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

const DesktopSearch = ({
    input,
    setInput,
    debouncedInput,
    expanded,
    headerHeight,
    setExpanded,
    sizeConfig,
    loading,
    data,
    width,
}) => {
    const history = useHistory();

    return (
        <div className="ml-4 d-none d-md-block">
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
                autoFocus
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
                                            <SimpleLink
                                                key={brand.id}
                                                to={'/b/' + brand.alias}
                                                className="btn-link"
                                            >
                                                {brand.name}
                                            </SimpleLink>
                                        ))}
                                    <SearchTitle className="mt-2">
                                        Kategorier
                                    </SearchTitle>
                                    {loading && <Spinner size="sm" />}
                                    {!loading &&
                                        data &&
                                        data.categories.length === 0 &&
                                        'Ingen resultater'}
                                    {!loading &&
                                        data &&
                                        data.categories
                                            .filter((x, index) => index < 5)
                                            .map((category) => (
                                                <SimpleLink
                                                    key={category.id}
                                                    to={'/c/' + category.alias}
                                                    className="btn-link"
                                                    onClick={() =>
                                                        tracking.categoryEvent(
                                                            category.id,
                                                            'click'
                                                        )
                                                    }
                                                >
                                                    {category.name}
                                                </SimpleLink>
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

export default DesktopSearch;
