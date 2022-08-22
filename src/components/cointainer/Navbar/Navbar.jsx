import React from 'react'
import { Logo } from '../../Logo/Logo'
import { NavContainer, NavMenu, NavMenuItem } from './Navbar.elements'
import { Link, useLocation } from "react-router-dom";
import { useEffect } from 'react';
import { kakaoLogOut } from '../../../service/kakaoLogin';
import { firebaseLogOut } from '../../../service/firebaseLogin';
import Database from '../../../service/database';

const db = new Database();

const Navbar = ({login, setLogin, goToHome}) => {
  const location = useLocation();

  const handleLogOut = (e) => {
    e.preventDefault();
    const data = { id: login.ID, name: login.NAME, inOut: "OUT", regi_type: login.REGI_TYPE };
  
    if(login.REGI_TYPE === "KAKAO"){
      kakaoLogOut(data);
    }else if(login.REGI_TYPE === "GOOGLE"){
      firebaseLogOut(data);
    }else{

    }
    setLogin({ ID: "", NAME: "", EMAIL: "", REGI_TYPE: "", state: false });
    goToHome();
  }

  useEffect(() => {

  });

  if(location.pathname === "/login") return;

  return (
    <NavContainer>
        <Logo />
        <NavMenu>
            <NavMenuItem>
              { login.state ? <a href="/" onClick={handleLogOut}>로그아웃</a> : <Link to="login">로그인</Link> }
            </NavMenuItem>
            { login.state || <NavMenuItem><Link to="/join/new">회원가입</Link></NavMenuItem> }
            <NavMenuItem><Link to="">공유</Link></NavMenuItem>
        </NavMenu>
    </NavContainer>
  )
}

export default Navbar