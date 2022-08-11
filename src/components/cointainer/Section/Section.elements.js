import styled from "styled-components";
import theme from "../../../assets/styles/theme";

// Section
export const DefaultSection = styled.section`
    max-width: ${ ({ theme }) => theme.size.desktop };
    margin: 0 auto;
`;

export const MainSection = styled(DefaultSection)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 85px;

    & .left-container, .right-container {
        /* width: calc(100% / 2); */
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