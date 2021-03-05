import React from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import MobileLink from './MobileLink';
import useLockBodyScroll from '../../../hooks/useLockBodyScroll.js';
import Blue from './Blue.jsx';
import tracking from '../../../helpers/tracking.js';

const StyledCategory = styled.div`
    padding-left: ${(props) => props.indent}px;
`;

const MobileDropdownFullScreenWrapper = styled(Blue)`
    display: flex;
    flex-direction: column;

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10000;
    color: white;

    padding-bottom: 20px;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: row-reverse;
    padding: 10px;
    background-color: white;
    color: black;
`;

const List = styled.div`
    overflow-y: auto;
    flex: 1;
    flex-basis: 0;
    padding: 10px;
`;

const Category = ({ index, item, childItems, indent = 0, pushToStack }) => {
    const hasChild = childItems && childItems.length !== 0;

    return (
        <StyledCategory indent={indent}>
            <MobileLink
                onClick={() => {
                    if (!hasChild) {
                        if (item.categoryId) {
                            tracking.categoryEvent(item.categoryId, 'click');
                        }
                        item.onClick && item.onClick();
                    } else {
                        pushToStack(index);
                    }
                }}
                tag={hasChild ? 'div' : Link}
                to={item.to}
            >
                {item.name}
                <div className="d-inline-block" style={{ width: 18 }}>
                    {hasChild && <i className={cn('fa fa-caret-right')} />}
                </div>
            </MobileLink>
        </StyledCategory>
    );
};

const setupCategories = (categories, { onLinkClick }) => {
    return categories.map((c) => {
        return {
            name: c.name,
            to: `/c/${c.alias}`,
            onClick: onLinkClick(`category ${c.name}`),
            categoryId: c.id,
            children:
                c.childCategories &&
                c.childCategories.length !== 0 &&
                setupCategories(
                    [
                        {
                            ...c,
                            name: 'Alt i ' + c.name,
                            childCategories: [],
                        },
                        ...c.childCategories,
                    ],
                    { onLinkClick }
                ),
        };
    });
};

const MobileLinksDropdown = ({ categories, onLinkClick, brands, onClose }) => {
    useLockBodyScroll();
    const [stack, setStack] = React.useState([]);
    const items = [
        {
            name: 'Hjem',
            to: '/',
            onClick: onLinkClick('Hjem'),
        },
        {
            name: 'Tilbud',
            to: '/offers',
            onClick: onLinkClick('Tilbud'),
        },
        {
            name: 'Produktønsker',
            to: '/wishes',
            onClick: onLinkClick('Produktønsker'),
        },
        {
            name: 'Nye produkter',
            to: '/new-products',
            onClick: onLinkClick('Nye produkter'),
        },
        ...setupCategories(categories, { onLinkClick }),
        {
            name: 'Merke',
            children: brands.map((brand) => {
                const path = `/b/${brand.alias}`;

                return {
                    name: brand.name,
                    to: path,
                    onClick: onLinkClick(`Merke "${brand.name}"`),
                };
            }),
        },
    ];

    const actualItems = React.useMemo(() => {
        return stack.reduce((newItems, stack) => {
            const wantedIndex = newItems[stack];
            if (!wantedIndex || !wantedIndex.children) {
                setStack([]);
                return [];
            }

            return wantedIndex.children;
        }, items);
    }, [stack]);

    return (
        <MobileDropdownFullScreenWrapper>
            <Header>
                <div style={{ cursor: 'pointer' }} onClick={onClose}>
                    <i className="fa fa-close mr-2" />
                    Lukk
                </div>
                {stack.length !== 0 && (
                    <div
                        style={{ cursor: 'pointer' }}
                        onClick={() => setStack(stack.slice(0, -1))}
                    >
                        <i className="fa fa-caret-left mr-2" />
                        Gå tilbake
                    </div>
                )}
            </Header>
            <List>
                {actualItems.map((item, index) => (
                    <Category
                        key={index}
                        index={index}
                        item={item}
                        childItems={item.children}
                        children={item.children}
                        pushToStack={(index) => setStack([...stack, index])}
                    />
                ))}
            </List>
        </MobileDropdownFullScreenWrapper>
    );
};

export default MobileLinksDropdown;
