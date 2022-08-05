import styled from "styled-components";

export const Page = styled.section`
    max-width: ${ prop => prop.theme.desktop };
    margin: 0 auto;
`;

export const WrapperF = styled.ul`
    display: flex;
    flex-direction: ${ prop => prop.styles.flexDirection == "row" ? "row" : "column" };
`;