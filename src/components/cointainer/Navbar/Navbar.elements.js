import styled from "styled-components"

 
export const NavContainer = styled.nav`
    max-width: ${ ({ theme }) => theme.size.desktop };
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
`;

export const NavMenu = styled.ul`
    ${({ theme }) => theme.flexCenter }
    width: 224px;
`;

export const NavMenuItem = styled.li`
    position: relative;
    text-align: center;
    
    &:nth-child(1) { flex-grow: 1 }
    &:nth-child(2) { flex-grow: 1 }
    &:nth-child(3) { flex-grow: 1 }
    &:not(:last-child)::after {
        content: "";
        position: absolute;
        top: 0;right: 0;bottom: 0; margin: auto;
        width: 1px;
        height: 90%;
        border-radius: 5px;
        background-color: ${ ({ theme }) => theme.colors.border };
    }
    a {
        display: block;
        font-size: 1rem;
        line-height: 1;
        color: ${ ({ theme }) => theme.colors.commonBlack };
    }
`;