import React, { useRef, useState } from 'react'
import { Logo } from '../../components/Logo/Logo'
import { Wrapper, LoginContainer, NewLink } from './Login.element'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/pro-solid-svg-icons'
import { ButtonGoogle, ButtonKakao, ButtonLogin, ButtonNaver } from '../../components/Button/Button'
import { useEffect } from 'react'
import { InputEmail, InputPwd } from '../../components/Input/Input'
import { Link, Route, Routes } from 'react-router-dom'
import Database from '../../service/database'
import Join from '../Join/Join'
const db = new Database;

const Login = ({login, setLogin, goToHome}) => {
    const emailRef = useRef(null);
    const pwedRef = useRef(null);
    const formRef = useRef(null);

    const getUserData = (user) => {
        if(!user){
            alert("이메일 또는 비밀번호를 다시 확인하세요.\n회원등록이 되어 있지 않은 이메일이거나 이메일 또는 비밀번호를 잘못 입력하셨습니다.");
        }else{
            goToHome();
        }
    }

    const emailLogin = (evt) => {
        evt.preventDefault();
        const email = emailRef.current.value;
        const pwd = pwedRef.current.value;
        console.log("email: ", email);
        console.log("pwedRef: ", pwd);
        db.getSingleData("USERS", emailRef.current.value, getUserData);
    }

    useEffect(() => {

    }, []);

    return (
        <LoginContainer>
            <Link to="/"><Logo /></Link>
            <form ref={formRef}>
                <InputEmail emailRef={emailRef} />
                <InputPwd pwedRef={pwedRef} />
                <Wrapper className="input-wrapper">
                    <input type="checkbox" id="remember" />
                    <label htmlFor="remember">
                        <span className="checkbox"><FontAwesomeIcon icon={faCheck} /></span>
                        <span className="label">계정 기억하기</span>
                    </label>
                </Wrapper>
                <ButtonLogin emailLogin={emailLogin}/>
            </form>

            <Wrapper className="btns-wrapper">
                <NewLink to="/join/reset">비밀번호 재설정</NewLink>
                <NewLink to="/join/new">회원가입</NewLink>
            </Wrapper>

            <Wrapper className="sns-wrapper">
                <ButtonGoogle setLogin={setLogin} redirect={goToHome}/>
                <ButtonKakao setLogin={setLogin} redirect={goToHome}/>
                <ButtonNaver setLogin={setLogin} redirect={goToHome}/>
            </Wrapper>
        </LoginContainer>
    )
}

export default Login