import React from 'react';
import { Container } from 'reactstrap';
import styled from 'styled-components';

const StyledContainer = styled.div`
    max-width: ${(props) => (props.maxWidth ? `${props.maxWidth}px` : '100%')};
    margin: 0 auto;
`;

const NewContainer = ({ maxWidth = null, children, ...props }) => {
    return (
        <StyledContainer maxWidth={maxWidth}>
            <Container fluid={!!maxWidth} {...props}>
                {children}
            </Container>
        </StyledContainer>
    );
};

export default NewContainer;
