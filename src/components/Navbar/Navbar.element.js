import styled from "styled-components";
import { WrapperF } from "../Global.element";

export const Nav = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

export const Logo = styled.img`
    width: 75px;
`;
export const NavWrapper = styled(WrapperF)`
    width: 224px;
`;
export const NavList = styled.li`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    a {
        width: 72px;
        text-align: center;
        font-size: 1rem;
    }
    &:nth-child(1){ flex: 1}
    &:nth-child(2){ flex: 2}
    &:nth-child(3){ flex: 1}
    
    &:not(:last-child)::after {
        content: "";
        width: 1px;
        height: 70%;
        border-radius: 5px;
        background-color: #BCBCBC;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
    }
`;

