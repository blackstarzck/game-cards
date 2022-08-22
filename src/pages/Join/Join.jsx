import React, { useState } from 'react'
import { useRef } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { ButtonGoogle, ButtonKakao, ButtonNaver, ButtonSign } from '../../components/Button/Button';
import { InputForm } from '../../components/Input/Input';
import Database from '../../service/database';
import { setCookie } from '../../util/util';
import styles from './Join.module.css'

const db = new Database();

const Join = ({login, setLogin, goToHome}) => {
    const params = useParams();
    const formRef = useRef();
    const idRef = useRef();
    const pw1Ref = useRef();
    const pw2Ref = useRef();
    const emailRef = useRef();
    const nmRef = useRef();

    const idText1Ref = useRef();
    const idText2Ref = useRef();
    const pwText1Ref = useRef();
    const pwText2Ref = useRef();
    const pwText3Ref = useRef();
    const pwText4Ref = useRef();
    const email1TextRef = useRef();
    const email2TextRef = useRef();

    const [ idState, setIdState ] = useState({ id1: true, id2: false }); // id2 중복확인
    const [ pwState, setPwState ] = useState({ pw1: true, pw2: true, pw3: true, result: "", dup: true }); // 비밀번호 중복확인
    const [ emailState, setEmailState ] = useState({ reg: true, result: "", dup: false }); // 이메일 중복확인

    const getIdResult = (result) => {
        if(result){
            alert("입력하신 아이디는 이미 사용중입니다.");
            setIdState({...idState, id2: false});
        }else{
            alert("입력하신 아이디는 사용하실 수 있습니다.");
            setIdState({...idState, id2: true});
        }
    }

    const getEmailResult = (result) => {
        if(result && (result.USER_EMAIL === emailState.result)){
            alert("입력하신 이메일은 이미 사용중입니다.");
            setEmailState({...emailState, dup: false});
        }else{
            alert("입력하신 이메일은 사용하실 수 있습니다.");
            setEmailState({...emailState, dup: true});
        }
    }

    const handleCheck = (type) => {
        const value = type === "id" ? idRef.current.value : emailRef.current.value;;

        if(type === "id"){
            if(idState.id1 && value !== ""){
                db.getSingleData("USERS", value, getIdResult);
            }else{
                alert("입력하신 아이디가 유효하지 않습니다.");
                setIdState({...idState, id2: false});
            }
        }
        if(type=== "email"){
            if(emailState.reg && value !== ""){
                db.getSingleData("USERS", value, getEmailResult);
            }else{
                alert("입력하신 이메일 주소가 유효하지 않습니다.");
                setEmailState({...emailState, dup: false});
            }
        }
    }

    const handleSignIn = (e) => {
        e.preventDefault();

        if(idRef.current.value === ""){
            alert("아이디를 입력해주세요.");
            idRef.current.focus();
            return
        }else{
            if(!idState.id1){ alert("입력하신 아이디가 유효하지 않습니다."); return }
            if(!idState.id2){ alert("아이디 중복확인을 해주세요."); return }
        }
        if(pw1Ref.current.value === ""){
            alert("비밀번호를 입력해주세요.");
            pw1Ref.current.focus();
            return
        }else{
            if(!pwState.pw1 || !pwState.pw2 || !pwState.pw3){ alert("입력하신 비밀번호의 유효성을 다시 검사해주세요."); return }
        }
        if(pw2Ref.current.value === ""){
            alert("동일한 비밀번호를 입력해주세요.");
            pw2Ref.current.focus();
            return
        }else{
            if(!pwState.dup){ alert("비밀번호가 동일하지 않습니다."); return }
        }
        if(nmRef.current.value === ""){
            alert("이름을 입력해주세요.");
            nmRef.current.focus();
            return
        }
        if(emailRef.current.value === ""){
            alert("이메일을 입력해주세요.");
            emailRef.current.focus();
            return
        }else{
            if(!emailState.reg){ alert("입력하신 이메일 주소가 유효하지 않습니다."); return }
            if(!emailState.dup){ alert("이메일 중복확인을 해주세요."); return }
        }

        const input = {
            regi_type: "EMAIL",
            email: emailRef.current.value,
            id: idRef.current.value,
            name: nmRef.current.value,
            pwd: pw2Ref.current.value,
            log: [{ status: "IN", time: new Date() }]
        }
        const userData = {
            user_email: emailRef.current.value,
            user_id: idRef.current.value,
            user_pwd: pw2Ref.current.value,
            user_name: nmRef.current.value,
            auto: false
        }

        setCookie("U_INFO", JSON.stringify(userData).replace(/[\{\}\[\]\/?.;|\~`\"]/g, ""), 1);
        setLogin({ID: idRef.current.value, NAME: nmRef.current.value, EMAIL: emailRef.current.value, REGI_TYPE: "EMAIL", state: true});
        db.writeNewDataV2("USER_LOG", idRef.current.value, input); // 1회성
        db.writeNewDataV2("USERS", idRef.current.value, input, goToHome); // 1회성
    }

    useEffect(() => {
        idState.id1 ? idText1Ref.current.style.color = "#8b8b8b" : idText1Ref.current.style.color = "#FF3333";
        idState.id2 ? idText2Ref.current.style.color = "#8b8b8b" : idText2Ref.current.style.color = "#FF3333";
        pwState.pw1 ? pwText1Ref.current.style.color = "#8b8b8b" : pwText1Ref.current.style.color = "#FF3333";
        pwState.pw2 ? pwText2Ref.current.style.color = "#8b8b8b" : pwText2Ref.current.style.color = "#FF3333";
        pwState.pw3 ? pwText3Ref.current.style.color = "#8b8b8b" : pwText3Ref.current.style.color = "#FF3333";
        emailState.dup ? email1TextRef.current.style.color = "#8b8b8b" : email1TextRef.current.style.color = "#FF3333";

        // console.log(`1: ${pwState.result} | 2: ${pw2Ref.current.value}`);

    }, [idState, pwState, emailState]);


    return (
        <section className={styles.register}>
            <div className={styles.regiContainer}>
                <h2 className={styles.title}>회원가입</h2>
                <span className={styles.snsHeading}>SNS계정으로 간편하게 회원가입</span>
                <div className={styles.snsWrapper}>
                    <ButtonGoogle setLogin={setLogin} redirect={goToHome}/>
                    <ButtonKakao setLogin={setLogin} redirect={goToHome}/>
                    <ButtonNaver setLogin={setLogin} redirect={goToHome}/>
                </div>

                <span className={styles.text}><b className={styles.red}>*</b>필수입력사항</span>
                <div className={styles.container}>
                    <form ref={formRef}>
                        <table>
                            <tbody>
                                <tr>
                                    <td className={styles.heading}>아이디 <b className={styles.red}>*</b></td>
                                    <td>
                                        <div className={styles.inputWrapper}>
                                        <InputForm validate="id" inputRef={idRef} setIdState={setIdState} idState={idState}/>
                                            <span  className={styles.descr} ref={idText1Ref} >〮 6자 이상의 영문 혹은 영문과 숫자를 조합</span>
                                            <span className={styles.descr} ref={idText2Ref} >〮 아이디 중복확인</span>
                                        </div>
                                    </td>
                                    <td><button type="button" className={styles.btnCheck} onClick={() => handleCheck("id")}>중복확인</button></td>
                                </tr>
                                <tr>
                                    <td className={styles.heading}>비밀번호 <b className={styles.red}>*</b></td>
                                    <td>
                                        <div className={styles.inputWrapper}>
                                            <InputForm validate="pw" inputRef={pw1Ref} setPwState={setPwState} pwState={pwState} />
                                            <span className={styles.descr} ref={pwText1Ref} >〮 8자 이상 입력</span>
                                            <span className={styles.descr} ref={pwText2Ref} >〮 영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합</span>
                                            <span className={styles.descr} ref={pwText3Ref} >〮 동일한 숫자 3개 이상 연속 사용 불가</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className={styles.heading}>비밀번호 확인 <b className={styles.red}>*</b></td>
                                    <td>
                                        <div className={styles.inputWrapper}>
                                            <InputForm validate="pw-cfrm" inputRef={pw2Ref} setPwState={setPwState} pwState={pwState} />
                                            { (pwState.result !== "" && !pwState.dup) && <span className={`${styles.descr} ${styles.warning}`} ref={pwText4Ref} >〮 동일한 비밀번호를 입력해주세요</span> }
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className={styles.heading}>이름 <b className={styles.red}>*</b></td>
                                    <td>
                                        <InputForm validate="name" inputRef={nmRef} />
                                    </td>
                                </tr>
                                <tr>
                                    <td className={styles.heading}>이메일 <b className={styles.red}>*</b></td>
                                    <td>
                                        <div className={styles.inputWrapper}>
                                            <InputForm validate="email" inputRef={emailRef} emailState={emailState} setEmailState={setEmailState}/>
                                            { emailState.reg || <span className={`${styles.descr} ${styles.warning}`} ref={email2TextRef} >〮 이메일 형식이 아닙니다.</span> }
                                            <span className={styles.descr} ref={email1TextRef} >〮 이메일 중복확인</span>
                                        </div>
                                    </td>
                                    <td><button type="button" className={styles.btnCheck} onClick={() => handleCheck("email")}>중복확인</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
                <ButtonSign handleSignIn={handleSignIn}/>
            </div>
        </section>
    )
}

export default Join