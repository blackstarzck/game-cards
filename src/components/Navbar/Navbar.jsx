import React from 'react'
import { Nav, Logo, NavList, NavWrapper } from './Navbar.element'

const Navbar = () => {
  return (
    <Nav>
      <Logo src={`${process.env.PUBLIC_URL}/images/logo.png`}/>
      <NavWrapper styles={{flexDirection: "row"}}>
        <NavList><a href="">로그인</a></NavList>
        <NavList><a href="">회원가입</a></NavList>
        <NavList><a href="">공유</a></NavList>
      </NavWrapper>
    </Nav>
  );
}

export default Navbar