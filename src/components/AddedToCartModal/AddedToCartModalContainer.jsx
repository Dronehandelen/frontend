import React from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import Portal from '../Portal';
import { useLockBodyScroll, useWindowSize } from 'moment-hooks';
import { Transition } from 'react-transition-group';
import AddedToCartModal from './AddedToCartModal.jsx';
import DefaultHookQuery from '../../containers/DefaultHookQuery.jsx';
import { useQuery } from '@apollo/client';
import getProductQuery from './getProductQuery.js';
import sizeConfig from '../../config/size.js';

const PageCover = styled.div`
    visibility: hidden;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: ${(props) => props.zIndex};

    overflow-x: hidden;
    overflow-y: auto;

    &.isOpen {
        visibility: visible;
    }
`;

const ScrollWrapper = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    max-height: 100%;
    width: 100%;
    overflow-y: auto;
    background-color: rgba(0, 0, 0, 0);
    transition: all 0.3s ease-in-out;

    &.isOpen {
        background-color: rgba(0, 0, 0, 0.5);
    }
`;

const Dialog = styled.div`
    z-index: 1050;
    margin: 20px auto;
    max-width: 800px;
    position: relative;
    top: 100px;
    transition: all 0.3s ease-in-out;
    opacity: 0;

    @media screen and (max-width: ${sizeConfig.md}px) {
        margin: 0;
    }

    &.isOpen {
        top: 0;
        opacity: 1;
    }
`;

const Content = styled.div`
    background-color: white;
    box-shadow: 15px 15px 15px 0 rgba(0, 0, 0, 0.3);
    padding-top: 10px;

    @media screen and (max-width: ${sizeConfig.md}px) {
        height: 100vh;
        overflow-y: auto;
    }
`;

const AddedToCartModalContainer = ({ onClose, addedProductId }) => {
    const { width } = useWindowSize();
    useLockBodyScroll();

    const queryData = useQuery(getProductQuery, {
        variables: {
            id: addedProductId,
        },
    });

    return (
        <Portal>
            <Transition in={true} appear={true} timeout={0}>
                {(state) => (
                    <PageCover
                        zIndex={2050}
                        className={cn({
                            isOpen: state === 'entered',
                        })}
                    >
                        <ScrollWrapper
                            onClick={onClose}
                            className={cn({
                                isOpen: state === 'entered',
                            })}
                        >
                            <Dialog
                                onClick={(e) => e.stopPropagation()}
                                className={cn({
                                    isOpen: state === 'entered',
                                })}
                            >
                                <Content>
                                    <DefaultHookQuery
                                        queryHookData={queryData}
                                        handleNotFound
                                    >
                                        {({ data }) => (
                                            <AddedToCartModal
                                                product={data.product}
                                                productVisibleInCarousel={
                                                    width < sizeConfig.md
                                                        ? 1
                                                        : 2
                                                }
                                                onClose={onClose}
                                            />
                                        )}
                                    </DefaultHookQuery>
                                </Content>
                            </Dialog>
                        </ScrollWrapper>
                    </PageCover>
                )}
            </Transition>
        </Portal>
    );
};

export default (props) => {
    return !props.addedProductId ? (
        <></>
    ) : (
        <AddedToCartModalContainer {...props} />
    );
};
