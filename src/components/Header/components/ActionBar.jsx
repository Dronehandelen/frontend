import styled from 'styled-components';

export const ActionBar = styled.div`
    display: flex;

    > * {
        flex-grow: 1;
        flex-basis: 0;
    }
`;

export const ActionBarButton = styled.div`
    color: white;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    position: relative;

    &.selected {
        background-color: rgba(255, 255, 255, 0.3);
    }
`;
