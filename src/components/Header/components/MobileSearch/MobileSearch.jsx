import React from 'react';
import {
    Button,
    Container,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Row,
    Spinner,
} from 'reactstrap';
import { useDebounce, useLockBodyScroll } from 'moment-hooks';
import styled from 'styled-components';

import SearchContainer from '../../../../containers/SearchContainer.jsx';
import { ProductListItem } from '../../../Product/index.js';
import MobileDropdownWrapper from '../MobileDropdownWrapper.jsx';
import useSearchLogging from '../../../../hooks/useSearchLogging.js';
import { Link, useHistory, useLocation } from 'react-router-dom';
import CompactListProduct from '../../../Product/CompactListProduct.jsx';

const Wrapper = styled(MobileDropdownWrapper)`
    z-index: 3;
    ${(props) =>
        props.expanded
            ? `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: white;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    padding: 5px;
    `
            : ''}
`;

const InputWrapper = styled.div``;

const StyledInput = styled(Input)`
    width: 100%;
`;

const Results = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 5px 5px 15px 5px;
    overflow-y: auto;
`;

const Products = styled.div`
    & > *:not(:last-child) {
        border-bottom: 1px solid #cdcdcd;
    }
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

const MobileSearchContainer = ({
    input,
    setInput,
    loading,
    brands,
    products,
    isInFullScreen,
    setHasFocus,
    onEnter,
}) => {
    return (
        <Wrapper expanded={isInFullScreen} className="text-dark">
            <InputWrapper expanded={isInFullScreen}>
                <Container>
                    <Row>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <i className="fa fa-search" />
                                </InputGroupText>
                            </InputGroupAddon>
                            <StyledInput
                                id="mobile-header-search"
                                placeholder="Søk for produkter..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onFocus={() => setHasFocus(true)}
                                onBlur={() => setHasFocus(false)}
                                onKeyDown={(e) => {
                                    if (
                                        input.length !== 0 &&
                                        e.key === 'Enter'
                                    ) {
                                        onEnter();
                                    }
                                }}
                                autoFocus
                            />
                            {isInFullScreen && (
                                <InputGroupAddon addonType="append">
                                    <Button
                                        onClick={() => setInput('')}
                                        color="primary"
                                    >
                                        Lukk
                                    </Button>
                                </InputGroupAddon>
                            )}
                        </InputGroup>
                    </Row>
                </Container>
            </InputWrapper>
            {isInFullScreen && (
                <Results>
                    {loading && <Spinner />}
                    {!loading && (
                        <>
                            <Products>
                                {products && products.length === 0 && (
                                    <div className="p-4">
                                        <strong>Ingen resultater</strong>
                                    </div>
                                )}
                                {products &&
                                    products.map((product) => (
                                        <CompactListProduct
                                            key={product.id}
                                            product={product}
                                        />
                                    ))}
                            </Products>
                            {brands && brands.length !== 0 && (
                                <div className="mt-3">
                                    <div>
                                        <strong>Merker</strong>
                                    </div>
                                    <div>
                                        {brands &&
                                            brands.map((brand) => (
                                                <Brand
                                                    key={brand.id}
                                                    to={'/b/' + brand.alias}
                                                    className="btn-link"
                                                >
                                                    {brand.name}
                                                </Brand>
                                            ))}
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </Results>
            )}
        </Wrapper>
    );
};

export default MobileSearchContainer;
