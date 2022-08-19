import React from 'react'
import { Logo } from '../../Logo/Logo'
import { NavContainer, NavMenu, NavMenuItem } from './Navbar.elements'
import { Link } from "react-router-dom";
import { useEffect } from 'react';
import { kakaoLogOut } from '../../../service/kakaoLogin';
import { firebaseLogOut } from '../../../service/firebaseLogin';
import Database from '../../../service/database';

const db = new Database();

const Navbar = ({login, setLogin, goToHome}) => {
  const handleLogOut = (e) => {
    e.preventDefault();
    const data = { id: login.ID, name: login.NAME, inOut: "OUT" };

    console.log("로그아웃 데이터: ", data)
  
    if(login.REGI_TYPE === "KAKAO"){
      kakaoLogOut(data).then(() => {
        setLogin({ ID: "", NAME: "", REGI_TYPE: "", state: false });
        goToHome(null);
      });
    }else{
      firebaseLogOut(data).then(() => {
        setLogin({ ID: "", NAME: "", REGI_TYPE: "", state: false });
        goToHome(null);
      });
    }
  }

  useEffect(() => {

  }, []);

  return (
    <NavContainer>
        <Logo />
        <NavMenu>
            <NavMenuItem>
              { login.state ? <a href="/" onClick={handleLogOut}>로그아웃</a> : <Link to="login">로그인</Link> }
            </NavMenuItem>
            <NavMenuItem><Link to="">회원가입</Link></NavMenuItem>
            <NavMenuItem><Link to="">공유</Link></NavMenuItem>
        </NavMenu>
    </NavContainer>
  )
}

export default Navbar