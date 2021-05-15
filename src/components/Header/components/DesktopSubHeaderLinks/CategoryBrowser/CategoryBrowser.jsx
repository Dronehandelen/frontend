import React from 'react';
import SubHeaderLink from '../SubHeaderLink.jsx';
import headerContext from '../../../../../contexts/header.js';
import styled from 'styled-components';
import cn from 'classnames';
import Row from './Row.jsx';
import { useLocation } from 'react-router-dom';

const Background = styled.div`
    position: fixed;
    left: 0;
    top: ${(props) => props.top}px;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 10;
`;

const Wrapper = styled.div`
    z-index: 10;
    position: absolute;
    background-color: white;
    color: black;
    display: flex;
    box-shadow: 5px 5px 10px 0 rgba(0, 0, 0, 0.8);
`;

const Column = styled.div`
    width: 250px;

    &:not(:first-child) {
        border-left: 1px solid gray;
    }
`;

const CategoryBrowser = ({ categories }) => {
    let location = useLocation();
    const refDropDown = React.useRef();
    const { height: headerHeight } = React.useContext(headerContext);
    const [expanded, setExpanded] = React.useState(false);
    const [stack, setStack] = React.useState([]);

    React.useEffect(() => {
        setExpanded(false);
    }, [location]);

    React.useEffect(() => {
        if (!expanded) {
            setStack([]);
        }
    }, [expanded]);

    return (
        <div style={{ position: 'relative' }}>
            <SubHeaderLink
                tag={'div'}
                onClick={() => setExpanded(true)}
                className={cn({
                    selected: expanded,
                })}
            >
                <span>
                    <i className="fa fa-bars mr-2" style={{ width: 15 }} />
                    Alle produkter
                </span>
            </SubHeaderLink>
            {expanded && (
                <>
                    <Background
                        onClick={() => setExpanded(false)}
                        top={headerHeight}
                    />
                    <Wrapper ref={refDropDown}>
                        <Column>
                            {categories.map((category, index) => {
                                const hasSubCategory =
                                    category.childCategories.length !== 0;

                                return (
                                    <Row
                                        key={category.id}
                                        hasSubCategory={hasSubCategory}
                                        to={`/c/${category.alias}`}
                                        onExpandChildCategories={() =>
                                            setStack([index])
                                        }
                                        categoryId={category.id}
                                    >
                                        {category.name}
                                    </Row>
                                );
                            })}
                        </Column>
                        {
                            stack.reduce(
                                (
                                    { categories, columns, currentStack },
                                    stack,
                                    index
                                ) => {
                                    const newCategories =
                                        categories[stack].childCategories;
                                    const newCurrentStack = [
                                        ...currentStack,
                                        stack,
                                    ];

                                    return {
                                        categories: newCategories,
                                        columns: [
                                            ...columns,
                                            <Column key={index}>
                                                {newCategories.map(
                                                    (category, index) => {
                                                        const hasSubCategory =
                                                            category
                                                                .childCategories
                                                                .length !== 0;

                                                        return (
                                                            <Row
                                                                hasSubCategory={
                                                                    hasSubCategory
                                                                }
                                                                to={`/c/${category.alias}`}
                                                                onExpandChildCategories={() => {
                                                                    setStack([
                                                                        ...newCurrentStack,
                                                                        index,
                                                                    ]);
                                                                }}
                                                                categoryId={
                                                                    category.id
                                                                }
                                                            >
                                                                {category.name}
                                                            </Row>
                                                        );
                                                    }
                                                )}
                                            </Column>,
                                        ],
                                        currentStack: newCurrentStack,
                                    };
                                },
                                {
                                    categories,
                                    columns: [],
                                    currentStack: [],
                                }
                            ).columns
                        }
                    </Wrapper>
                </>
            )}
        </div>
    );
};

export default CategoryBrowser;
