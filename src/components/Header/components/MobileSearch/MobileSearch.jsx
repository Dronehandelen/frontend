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
import styled from 'styled-components';

import MobileDropdownWrapper from '../MobileDropdownWrapper.jsx';
import { Link } from 'react-router-dom';
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

const SimpleLinks = styled.div`
    display: flex;
    flex-direction: row;
    & > * {
        flex: 1;
    }
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

const MobileSearchContainer = ({
    input,
    setInput,
    loading,
    brands,
    products,
    categories,
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
                                <SimpleLinks className="mt-3">
                                    <div>
                                        <div>
                                            <strong>Merker</strong>
                                        </div>
                                        <div>
                                            {brands &&
                                                brands.map((brand) => (
                                                    <SimpleLink
                                                        key={brand.id}
                                                        to={'/b/' + brand.alias}
                                                        className="btn-link"
                                                    >
                                                        {brand.name}
                                                    </SimpleLink>
                                                ))}
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            <strong>Kategorier</strong>
                                        </div>
                                        <div>
                                            {categories &&
                                                categories.map((category) => (
                                                    <SimpleLink
                                                        key={category.id}
                                                        to={
                                                            '/c/' +
                                                            category.alias
                                                        }
                                                        className="btn-link"
                                                    >
                                                        {category.name}
                                                    </SimpleLink>
                                                ))}
                                        </div>
                                    </div>
                                </SimpleLinks>
                            )}
                        </>
                    )}
                </Results>
            )}
        </Wrapper>
    );
};

export default MobileSearchContainer;
