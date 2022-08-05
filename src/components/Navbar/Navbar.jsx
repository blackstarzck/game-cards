import React from 'react'
import { WrapperF } from '../Global.element'
import { Nav, Logo, NavList } from './Navbar.element'

const Navbar = () => {
  return (
    <Nav>
      <Logo src={`${process.env.PUBLIC_URL}/images/logo.png`}/>
      <WrapperF styles={{flexDirection: "row"}}>
        <NavList><a href="">로그인</a></NavList>
        <NavList><a href="">회원가입</a></NavList>
        <NavList><a href="">공유</a></NavList>
      </WrapperF>
    </Nav>
  );
}

export default Navbar