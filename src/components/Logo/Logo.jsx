import React from 'react'
import styled from "styled-components"
import logoSrc from "../../assets/images/logo.png";

const LogoNav = styled.h1`
    display: block;
    width: 75px;
    img { width: 100%; }
`;

export const Logo = () => {
    return(
        <LogoNav>
            <img src={logoSrc} />
        </LogoNav>
    );
}