import React from 'react'
import { Logo } from '../../Logo/Logo'
import { NavContainer, NavMenu, NavMenuItem } from './Navbar.elements'
import { Link } from "react-router-dom";

const Navbar = (props) => {
  return (
    <NavContainer>
        <Logo />
        <NavMenu>
            <NavMenuItem><Link to="login">로그인</Link></NavMenuItem>
            <NavMenuItem><Link to="">회원가입</Link></NavMenuItem>
            <NavMenuItem><Link to="">공유</Link></NavMenuItem>
        </NavMenu>
    </NavContainer>
  )
}

export default Navbar