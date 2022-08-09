import React from 'react'
import { LogoImg, Default, Sub, Nav } from './Logo.elements'
import logoSrc from "../../assets/images/logo.png";

export const Logo = ({ children, ...props }) => {
    return(
        <Default {...props}>
            <LogoImg src={logoSrc} />
        </Default>
    );
};

Logo.Nav = ({ children, ...props }) => {
    return <Nav {...props}><LogoImg src={logoSrc} /></Nav>
}

Logo.Sub = ({ children, ...props }) => {
    return <Sub {...props}><LogoImg src={logoSrc} /></Sub>
}
  