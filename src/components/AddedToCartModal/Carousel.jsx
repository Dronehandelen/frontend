import React from 'react';
import styled from 'styled-components';

const maxWidth = 98;
const Wrapper = styled.div`
    position: relative;
`;

const Arrow = styled.div`
    position: absolute;
    top: calc(50% - 5px);
    background-color: #c2c2c2;
    border-radius: 50%;
    height: 45px;
    width: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:hover {
        background-color: #8b8b8b;
    }
`;

const ArrowLeft = styled(Arrow)`
    left: 10px;

    & > i {
        margin-left: -4px;
    }
`;

const ArrowRight = styled(Arrow)`
    right: 10px;

    & > i {
        margin-right: -4px;
    }
`;

const StyledCarousel = styled.div`
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: -ms-autohiding-scrollbar;
    scroll-behavior: smooth;
    align-items: stretch;

    & > * {
        flex: 0 0 ${(props) => maxWidth / props.visibleItems}%;
    }
`;

const Carousel = ({ children, visibleItems = 2 }) => {
    const ref = React.useRef();

    const numberOfItems = React.Children.toArray(children).length;

    const onClick = (left = false) => () => {
        const clientWidth = ref.current.clientWidth;
        const maxScroll = ref.current.scrollWidth - clientWidth;

        if (maxScroll <= 0) {
            return;
        }

        const currentScroll = ref.current.scrollLeft;
        const cardWidth = (maxWidth / visibleItems / 100) * clientWidth;
        const currentCard = Math.floor((currentScroll + 20) / cardWidth);

        const newScroll = (currentCard + (left ? -1 : 1)) * cardWidth;
        ref.current.scrollTo(newScroll, 0);
    };

    return (
        <Wrapper>
            <StyledCarousel visibleItems={visibleItems} ref={ref}>
                {children}
            </StyledCarousel>
            {numberOfItems > visibleItems && (
                <>
                    <ArrowLeft onClick={onClick(true)}>
                        <i className="fa fa-angle-left fa-2x" />
                    </ArrowLeft>
                    <ArrowRight onClick={onClick(false)}>
                        <i className="fa fa-angle-right fa-2x" />
                    </ArrowRight>
                </>
            )}
        </Wrapper>
    );
};

export default Carousel;
