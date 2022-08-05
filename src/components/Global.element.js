import styled from "styled-components";

export const WrapperF = styled.ul`
    display: flex;
    flex-direction: ${ props => props.styles.flexDirection == "row" ? "row" : "column" };
`;