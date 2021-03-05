import React from 'react';
import cn from 'classnames';
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Collapse,
} from 'reactstrap';
import tracking from '../helpers/tracking.js';
import Checkbox from './Checkbox/Checkbox.jsx';

const ProductFilters = ({ productFilters, state }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const tagGroups = productFilters.tags.reduce(
        (tagGroups, productFilterTag) => {
            const tag = productFilterTag.tag;
            let index = tagGroups.findIndex(
                (tagGroup) => tag.tagGroup.id === tagGroup.id
            );
            if (index === -1) {
                tagGroups.push({
                    ...tag.tagGroup,
                    tags: [],
                });

                index = tagGroups.length - 1;
            }

            tagGroups[index].tags.push(productFilterTag);

            return tagGroups;
        },
        []
    );

    const filters = (
        <>
            {productFilters.categories &&
                productFilters.categories.length !== 0 && (
                    <Card className="mb-2">
                        <CardHeader
                            className="text-white"
                            style={{ backgroundColor: '#0277bd' }}
                        >
                            <strong>Kategorier</strong>
                        </CardHeader>
                        <CardBody>
                            {productFilters.categories
                                .sort((a, b) =>
                                    a.category.name.localeCompare(
                                        b.category.name
                                    )
                                )
                                .map((categoryInfo) => {
                                    const selected = state.categoryIds.has(
                                        categoryInfo.category.id
                                    );

                                    const toggle = () => {
                                        tracking.event(
                                            'Product filters',
                                            `Category ${
                                                categoryInfo.category.name
                                            } ${
                                                selected
                                                    ? 'Deselected'
                                                    : 'selected'
                                            }`
                                        );

                                        state.categoryIds.toggle(
                                            categoryInfo.category.id
                                        );
                                    };

                                    return (
                                        <div
                                            key={categoryInfo.category.id}
                                            className="mb-2"
                                        >
                                            <Checkbox
                                                checked={selected}
                                                toggle={toggle}
                                            >
                                                {categoryInfo.category.name} (
                                                {categoryInfo.productCount})
                                            </Checkbox>
                                        </div>
                                    );
                                })}
                        </CardBody>
                    </Card>
                )}
            {productFilters.brands && productFilters.brands.length !== 0 && (
                <Card className="mb-2">
                    <CardHeader
                        className="text-white"
                        style={{ backgroundColor: '#0277bd' }}
                    >
                        <strong>Merke</strong>
                    </CardHeader>
                    <CardBody>
                        {productFilters.brands
                            .sort((a, b) =>
                                a.brand.name.localeCompare(b.brand.name)
                            )
                            .map((brandInfo) => {
                                const selected = state.brandIds.has(
                                    brandInfo.brand.id
                                );

                                const toggle = () => {
                                    tracking.event(
                                        'Product filters',
                                        `Brand ${brandInfo.brand.name} ${
                                            selected ? 'Deselected' : 'selected'
                                        }`
                                    );

                                    state.brandIds.toggle(brandInfo.brand.id);
                                };

                                return (
                                    <div
                                        key={brandInfo.brand.id}
                                        className="mb-2"
                                    >
                                        <Checkbox
                                            checked={selected}
                                            toggle={toggle}
                                        >
                                            {brandInfo.brand.name} (
                                            {brandInfo.productCount})
                                        </Checkbox>
                                    </div>
                                );
                            })}
                    </CardBody>
                </Card>
            )}
            {tagGroups
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((tagGroup) => {
                    return (
                        <Card key={tagGroup.id} className="mb-2">
                            <CardHeader
                                className="text-white"
                                style={{ backgroundColor: '#0277bd' }}
                            >
                                <strong>{tagGroup.name}</strong>
                            </CardHeader>
                            <CardBody>
                                {tagGroup.tags
                                    .sort((a, b) =>
                                        a.tag.name.localeCompare(b.tag.name)
                                    )
                                    .map((productFilterTag) => {
                                        const selected = state.tagIds.has(
                                            productFilterTag.tag.id
                                        );

                                        const toggle = () => {
                                            tracking.event(
                                                'Product filters',
                                                `Tag "${tagGroup.name} > ${
                                                    productFilterTag.tag.name
                                                }" ${
                                                    selected
                                                        ? 'deselected'
                                                        : 'selected'
                                                }`
                                            );

                                            state.tagIds.toggle(
                                                productFilterTag.tag.id
                                            );
                                        };

                                        return (
                                            <div
                                                key={productFilterTag.tag.id}
                                                className="mb-2"
                                            >
                                                <Checkbox
                                                    checked={selected}
                                                    toggle={toggle}
                                                >
                                                    {productFilterTag.tag.name}{' '}
                                                    (
                                                    {
                                                        productFilterTag.productCount
                                                    }
                                                    )
                                                </Checkbox>
                                            </div>
                                        );
                                    })}
                            </CardBody>
                        </Card>
                    );
                })}
        </>
    );

    return (
        <>
            <div className="d-none d-sm-block">{filters}</div>
            <div className="d-block d-sm-none">
                <Card className="my-3">
                    <CardHeader
                        style={{ cursor: 'pointer' }}
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <i
                            className={cn('fa mr-2', {
                                'fa-caret-down': !isOpen,
                                'fa-caret-up': isOpen,
                            })}
                        />
                        Filter
                    </CardHeader>
                    <Collapse isOpen={isOpen}>
                        <CardBody>{filters}</CardBody>
                        <CardFooter>
                            <Button
                                color="secondary"
                                block
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                Lukk
                            </Button>
                        </CardFooter>
                    </Collapse>
                </Card>
            </div>
        </>
    );
};

export default ProductFilters;
