import React from 'react';
import cn from 'classnames';
import { Link, matchPath, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import SubHeaderLink from './SubHeaderLink.jsx';
import SubHeaderDropDown from './SubHeaderDropDown.jsx';
import { Col, Container, Row } from 'reactstrap';
import CategoryBrowser from './CategoryBrowser';

const SubHeader = styled.div`
    background-color: #0277bd;
    color: white;
    justify-content: center;
    display: flex;

    & div.barContent {
        display: block;

        & > * {
            display: inline-block;
        }
    }
`;

const DesktopSubHeaderLinks = ({ categories, onLinkClick, brands }) => {
    let location = useLocation();
    const [expandedIndex, setSelectedIndex] = React.useState(null);
    const [debouncedSelectedIndex, setDebouncedSelectedIndex] = React.useState(
        expandedIndex
    );

    React.useEffect(() => {
        if (expandedIndex) {
            return setDebouncedSelectedIndex(expandedIndex);
        }

        const timeout = setTimeout(() => {
            setDebouncedSelectedIndex(expandedIndex);
        }, 100);

        return () => {
            clearTimeout(timeout);
        };
    }, [expandedIndex]);

    const items = [
        {
            name: 'Nye produkter',
            to: '/new-products',
            onClick: onLinkClick('Nye produkter'),
        },
        {
            name: 'Merke',
            children: brands.map((brand) => {
                const path = `/b/${brand.alias}`;

                return {
                    name: brand.name,
                    to: path,
                    onClick: onLinkClick(`Merke ${brand.name}`),
                };
            }),
        },
        {
            name: 'Tilbud',
            to: '/offers',
            onClick: onLinkClick('Tilbud'),
            style: {
                backgroundColor: '#d93717',
            },
        },
        {
            name: 'Produktønsker',
            to: '/wishes',
            onClick: onLinkClick('Produktønsker'),
        },
    ];

    return (
        <SubHeader>
            <Container>
                <Row>
                    <Col>
                        <div className="barContent">
                            <CategoryBrowser categories={categories} />
                            {items.map((item, index) => {
                                const subHeaderLink = (ref) => (
                                    <SubHeaderLink
                                        key={`${index}-${item.to}`}
                                        tag={item.to ? Link : 'a'}
                                        to={item.to}
                                        className={cn({
                                            selected: matchPath(
                                                location.pathname,
                                                {
                                                    path: item.to,
                                                    exact: true,
                                                }
                                            ),
                                        })}
                                        onClick={onLinkClick('Hjem')}
                                        innerRef={ref}
                                        style={item.style}
                                    >
                                        {item.name}
                                    </SubHeaderLink>
                                );

                                if (
                                    !item.children ||
                                    item.children.length === 0
                                ) {
                                    return subHeaderLink();
                                }

                                return (
                                    <SubHeaderDropDown
                                        key={`${index}-${item.to}`}
                                        children={item.children}
                                        setIsOpen={(isOpen) =>
                                            setSelectedIndex(
                                                isOpen ? index : null
                                            )
                                        }
                                        isOpen={
                                            debouncedSelectedIndex === index
                                        }
                                        items={item.children}
                                    >
                                        {({ ref }) => subHeaderLink(ref)}
                                    </SubHeaderDropDown>
                                );
                            })}
                        </div>
                    </Col>
                </Row>
            </Container>
        </SubHeader>
    );
};

export default DesktopSubHeaderLinks;
