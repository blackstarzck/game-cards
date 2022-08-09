import styled from "styled-components";

// Section
export const DefaultSection = styled.section`

`;

export const MainSection = styled(DefaultSection)`
    display: flex;
    & .left-container, .right-container {
        width: calc(100% / 2);
    }
`;

export const FrdSearchSection = styled(DefaultSection)`

`;

// Container
export const Container = styled.article`

`;

// Wrapper
export const Wrapper = styled.ul`
    &.descr-wrapper {
        margin-top: 52px;
    }
    &.descr-wrapper li:not(:last-child) {
        margin-bottom: 7px;
    }
`;