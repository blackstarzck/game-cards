import styled from "styled-components";

export const Box = styled.div`
    width: 500px;
    height: 200px;
    background: ${ prop => prop.theme.primaryColor }
`;