import React from 'react'
import { Logo } from '../../Logo/Logo'
import { Link, NavContainer, NavMenu, NavMenuItem } from './Navbar.elements'

const Navbar = (props) => {
  return (
    <NavContainer>
        <Logo />
        <NavMenu>
            <NavMenuItem><a href="">로그인</a></NavMenuItem>
            <NavMenuItem><a href="">회원가입</a></NavMenuItem>
            <NavMenuItem><a href="">공유</a></NavMenuItem>
        </NavMenu>
    </NavContainer>
  )
}

export default Navbar