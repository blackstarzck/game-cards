import React, { useRef, useState } from 'react'
import { Logo } from '../../components/Logo/Logo'
import { Wrapper, LoginContainer, NewLink } from './Login.element'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/pro-solid-svg-icons'
import { ButtonGoogle, ButtonKakao, ButtonLogin, ButtonNaver } from '../../components/Button/Button'
import { useEffect } from 'react'
import { InputEmail, InputPwd } from '../../components/Input/Input'
import { Link } from 'react-router-dom'


const Login = ({setLogin, goToHome}) => {
    const emailRef = useRef(null);
    const pwedRef = useRef(null);

    useEffect(() => {

    }, []);

    return (
        <LoginContainer>
            <form>

            </form>
            <Link to="/"><Logo  /></Link>
            <InputEmail
                placeholder="이메일" />
            <InputPwd
                placeholder="비밀번호" />

            <Wrapper className="input-wrapper">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">
                    <span className="checkbox"><FontAwesomeIcon icon={faCheck} /></span>
                    계정 기억하기
                </label>
            </Wrapper>

            <ButtonLogin />

            <Wrapper className="btns-wrapper">
                <NewLink to="">비밀번호 재설정</NewLink>
                <NewLink to="">회원가입</NewLink>
            </Wrapper>

            <Wrapper className="sns-wrapper">
                <ButtonGoogle setLogin={setLogin} goToHome={goToHome}/>
                <ButtonKakao setLogin={setLogin} goToHome={goToHome}/>
                <ButtonNaver setLogin={setLogin} goToHome={goToHome}/>
            </Wrapper>
        </LoginContainer>
    )
}

export default Login