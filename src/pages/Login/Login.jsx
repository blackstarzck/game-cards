import React, { useRef } from 'react'
import { Logo } from '../../components/Logo/Logo'
import { Wrapper, LoginContainer, NewLink } from './Login.element'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/pro-solid-svg-icons'
import { ButtonGoogle, ButtonKakao, ButtonLogin, ButtonNaver } from '../../components/Button/Button'
import { useEffect } from 'react'
import { InputEmail, InputPwd } from '../../components/Input/Input'
import { Link, useLocation } from 'react-router-dom'
import Database from '../../service/database'
import { handleSessionItem, rememberUserData, setCookie } from '../../util/util'

const db = new Database;

const Login = ({login, setLogin, goToHome}) => {
    let location = useLocation();
    const emailRef = useRef(null);
    const pwedRef = useRef(null);
    const formRef = useRef(null);
    const checkRef = useRef(null);

    const emailLogin = async (evt) => { // 카카오, 파이어베이스 로그인과는 다르게 사용자의 아이디/비번을 수동으로 직접입력해야 하기 때문에 유효성 검사가 필요하다.
        evt.preventDefault();
        if(login.state){
            alert("이미 로그인되어 있습니다.");
            return
        }

        const id = emailRef.current.value;
        const pwd = pwedRef.current.value;
        const autoLogin = checkRef.current.checked;
        if(!emailRef.current.value){ alert("이메일을 입력해주세요."); emailRef.current.focus(); return }
        if(!pwedRef.current.value){ alert("비밀번호를 입력해주세요."); pwedRef.current.focus(); return }

        const user = await db.getSingleData("USERS", id);

        if(!user || (user && user.USER_PW !== pwd)){ // 실패
            alert("이메일 또는 비밀번호를 다시 확인하세요.\n회원등록이 되어 있지 않은 이메일이거나 이메일 또는 비밀번호를 잘못 입력하셨습니다.");
            return;
        }
        if(user){ // 성공
            const userData = {
                user_email: user.USER_EMAIL,
                user_id: user.USER_ID,
                user_pwd: user.USER_PW,
                user_name: user.USER_NAME,
                auto: autoLogin
            }
            const reqData = {
                regi_type: user.REGI_TYPE,
                name: user.USER_NAME,
                id: user.USER_ID,
                inOut: "IN",
                email: user.USER_EMAIL,
                AUTO_LOGIN: autoLogin
            };
            setCookie("U_INFO", "", -1); // 초기화
            setLogin({ID: id, NAME: user.USER_NAME, EMAIL: user.USER_EMAIL, REGI_TYPE: user.REGI_TYPE, state: true});
            const str = JSON.stringify(userData).replace(/[\{\}\[\]\;|\~`\"]/g, "");
            
            autoLogin && setCookie("U_INFO", str, 1);
            handleSessionItem("SET", "U_INFO", str);
            
            goToHome();
        }
    }


    useEffect(() => {
        const cookie = rememberUserData("U_INFO");
        if(cookie){
           checkRef.current.checked = (cookie.auto === "true") ? true : false;
           emailRef.current.value = cookie.id;
           pwedRef.current.value = cookie.pwd;
        }
    }, []);

    return (
        <LoginContainer>
            <Link to="/"><Logo /></Link>
            <form ref={formRef}>
                <InputEmail emailRef={emailRef} />
                <InputPwd pwedRef={pwedRef} emailLogin={emailLogin}/>
                <Wrapper className="input-wrapper">
                    <input ref={checkRef} type="checkbox" id="remember" />
                    <label htmlFor="remember">
                        <span className="checkbox"><FontAwesomeIcon icon={faCheck} /></span>
                        <span className="label">계정 기억하기</span>
                    </label>
                </Wrapper>
                <ButtonLogin emailLogin={emailLogin}/>
            </form>

            <Wrapper className="btns-wrapper">
                <NewLink disabled to="">비밀번호 재설정</NewLink>
                <NewLink to="/join/new">회원가입</NewLink>
            </Wrapper>

            <Wrapper className="sns-wrapper">
                <ButtonGoogle login={login} setLogin={setLogin} redirect={goToHome}/>
                <ButtonKakao login={login} setLogin={setLogin} redirect={goToHome}/>
                <ButtonNaver login={login} setLogin={setLogin} redirect={goToHome}/>
            </Wrapper>
        </LoginContainer>
    )
}

export default Login