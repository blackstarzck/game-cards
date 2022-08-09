import React from 'react'
import { Logo } from '../../Logo/Logo'
import { Link, NavContainer, NavLogo, NavMenu, NavMenuItem } from './Navbar.elements'

const Navbar = (props) => {
  return (
    <NavContainer>
        <Logo.Nav />
        <NavMenu>
            <NavMenuItem><Link href="">로그인</Link></NavMenuItem>
            <NavMenuItem><Link href="">회원가입</Link></NavMenuItem>
            <NavMenuItem><Link href="">공유</Link></NavMenuItem>
        </NavMenu>
    </NavContainer>
  )
}

export default Navbar