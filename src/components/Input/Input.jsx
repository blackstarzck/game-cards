import React, { useState, useEffect, useRef } from 'react'
import { ButtonTextClear, ButtonArrowDown, ButtonSearch, ButtonEyeOpen, ButtonEyeClose } from '../Button/Button'
import { Wrapper, NickNameInput, JobSelect, ContainerSelect, FrdSrchInput, EmailInput, PwdInput, FormInput, InputSearchContainer, InputSearch } from './input.elements'
import { gsap } from "gsap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/pro-solid-svg-icons'
import { faCircleXmark } from '@fortawesome/pro-light-svg-icons'

export const InputNickName = ({names, handleNames}) => {
    const [ inputVal, setInputVal ] = useState("");
    const inputRef = useRef();

    const onChnage = (evt) => {
        const { value } = evt.target;
        setInputVal(value);
        handleNames({ key: "NICK", value });
    }
    
    return(
        <Wrapper className="input-wrapper">
            <NickNameInput 
                ref={inputRef}
                name="NICK" 
                value={names.NICK || ""}
                placeholder="원하는 이름을 입력하세요" 
                onChange={onChnage} />
            { inputVal && <ButtonTextClear
                target={"NICK"}
                setInputVal={setInputVal}
                handleNames={handleNames} /> }
        </Wrapper>
    );
}

export const SelectJob = ({names, mainCard, updateCard, handleNames, imgLoaded}) => {
    const init = [
        { KR: '소프트웨어 엔지니어', key: 1, EN: 'Software Engineer' },
        { key: 2, EN: 'Frontend Developer', KR: '프론트엔드 개발자' },
        { key: 3, EN: 'Backend Developer', KR: '백엔드 개발자' },
        { KR: 'CTO', EN: 'Chief Technology Officer', key: 4 },
        { KR: 'QA', EN: 'Test Engineer', key: 5 },
        { EN: 'Web Publisher', key: 6, KR: '웹 퍼블리셔' },
        { EN: 'UI/UX Designer', key: 7, KR: 'UI/UX 디자이너' },
        { key: 8, EN: 'Data Engineer', KR: '데이터 엔지니어' },
        { key: 9, EN: 'Project Manager', KR: '기획자' }
    ]
    const [ jobLists, setJobLists ] = useState(init);
    const [ clicked, setClicked] = useState(false);

    const handleDropDown = (state) => {
        setClicked(state);
    }

    return(
        <Wrapper className="job-wrapper">
            <Wrapper className="show-selected" onClick={ () => handleDropDown(!clicked) }>
                <JobSelect>{names.JOB_KR || mainCard.JOB_KR}</JobSelect>
                <ButtonArrowDown clickState={clicked}/>
            </Wrapper>
            <JobLists
                imgLoaded={imgLoaded}
                list={jobLists}
                JOB_KR={"JOB_KR"}
                clickState={clicked}
                handleDropDown={handleDropDown}
                handleNames={handleNames} />
        </Wrapper>
    );
}

export const JobLists = ({ list, clickState, handleDropDown, handleNames }) => {
    const el = useRef(null);
    const tl = useRef(null);
    const toggle = clickState;
    let pos = 0;

    useEffect(() => {
        pos = 34;
        tl.current = gsap.timeline({ pause: true });
        tl.current.fromTo(el.current, { y: pos, opacity: 0 },{
            y: (pos + 5), opacity: 1, duration: .3,
            onStart: function(){
                el.current.style.visibility = "visible"
                el.current.style.zIndex = 3;
            }
        });
    }, []);

    useEffect(() => {
        toggle ? tl.current.play() : reverseFun();
    },[toggle]);

    const onClick = (kr, en) => {
        handleDropDown(!clickState);
        handleNames({ key: "JOB_EN", value: en });
        handleNames({ key: "JOB_KR", value: kr });
        console.log(kr, en)
    }

    const reverseFun = () => {
        tl.current.reverse();
        setTimeout(() => {
            el.current.style.visibility = "hidden";
            el.current.style.zIndex = -1;
        }, 400)
    }

    return(
        <ContainerSelect ref={el}>
            {list.map(list => (
                <li ref={el} key={list.key} onClick={ () => onClick(list.KR, list.EN) }>
                    <span>{list.KR}</span>
                    <span>{list.EN}</span>
                </li>
            ))}
        </ContainerSelect>
    );
}

export const InputFrdSrch = ({login, searchFunc, sOpen}) => {
    const [ inputVal, setInputVal ] = useState("");
    const inputRef = useRef();
    const onChnage = (evt) => {
        const { value } = evt.target;
        setInputVal(inputVal => inputVal = value.replace(/(\s*)/g, ""));
    }

    return(
        <Wrapper className="search-wrapper">
            <FrdSrchInput 
                readOnly={ login.state ? false : true }
                ref={inputRef}
                placeholder={login.state ? "친구를 검색해보세요. (추가: 'chanki1004')" : "로그인 후 이용가능합니다."}
                value={inputVal || ""}
                onChange={onChnage} 
                onKeyPress={(e) => { (e.key === "Enter" && inputVal) && searchFunc(inputVal)} } />

            { inputVal && <ButtonTextClear
                className={"btn-clear"}
                target={""}
                setInputVal={setInputVal} /> }
                <ButtonSearch login={login.state} searchFunc={() => inputVal && searchFunc(inputVal)}/>
        </Wrapper>
    );
}

export const InputEmail = ({emailRef}) => {
    const [ active, setActive ] = useState(false);
    const handleACtive = () => emailRef.current.value || setActive(!active);

    return(
        <>
        <EmailInput
            ref={emailRef}
            placeholder="이메일"
            active={active}
            onFocus={handleACtive}
            onBlur={handleACtive} />
        </>
    );
}
export const InputPwd = ({pwedRef, emailLogin}) => {
    const [ active, setActive ] = useState(false);
    const [ eye, setEye ] = useState(false);

    const handleACtive = () => pwedRef.current.value || setActive(!active);
    const handleKeyPress = (e) => {
        if(e.key === "Enter"){
            emailLogin(e);
            e.preventDefault();
        }
    }

    return(
        <Wrapper className="pwd-input-wrapper">
            <PwdInput
                eyeOpen={eye}
                ref={pwedRef}
                placeholder="비밀번호"
                active={active}
                onKeyPress={handleKeyPress}
                onFocus={handleACtive}
                onBlur={handleACtive} />
            <div className="btns-wrapepr">
                <ButtonEyeOpen eyeOpen={eye} setEye={setEye}/>
                <ButtonEyeClose eyeOpen={eye} setEye={setEye}/>
            </div>
        </Wrapper>
    );
}

export const InputForm = ({validate, inputRef, setIdState, setPwState, idState, pwState, emailState, setEmailState}) => {
    const [ active, setActive ] = useState(false);
    const handleACtive = () => inputRef.current.value || setActive(!active);

    const handleState = (data) => {
        if(validate === "id"){
            setIdState((idState) => {
                const updated = { ...idState };
                updated[data.key] = data.value;
                return updated;
            });
        }
        if(validate === "pw" || validate === "pw-cfrm"){
            setPwState((pwState) => {
                const updated = { ...pwState };
                updated[data.key] = data.value;
                return updated;
            });           
        }
        if(validate === "email"){
            setEmailState((emailState) => {
                const updated = { ...emailState };
                updated[data.key] = data.value;
                return updated;
            });  
        }
    }

    const validateInputs = (e) => {
        if(validate === "id"){
            const id1Reg = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{6,16}$/; // 6자 이상의 영문 혹은 영문과 숫자
            const id1Result = id1Reg.test(e.target.value);
            handleState({key: "id1", value: id1Result });
        }
        if(validate === "pw"){
            const pw1Reg = /^(?=.*[a-zA-z])(?=.*[0-9]).{8,}$/; // 8자리 이상
            const pw1Result = pw1Reg.test(e.target.value);
            handleState({key: "pw1", value: pw1Result });

            const pw2Reg = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,}$/; // 8 ~ 16자 영문, 숫자, 특수문자를 최소 한가지씩 조합
            const pw2Result = pw2Reg.test(e.target.value);
            handleState({key: "pw2", value: pw2Result });

            const pw3Reg = /(\w)\1\1/; // 동일한문자 3개 이상 금지
            const pw3Result = pw3Reg.test(e.target.value);
            handleState({key: "pw3", value: !pw3Result });

            handleState({key: "result", value: e.target.value });
        }
        if(validate === "pw-cfrm"){
            if(inputRef.current.value === pwState.result){
                handleState({key: "dup", value: true });
            }else{
                handleState({key: "dup", value: false });
            }
        }
        if(validate === "email"){
            const emailReg = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
            const emailResult = emailReg.test(e.target.value);
            handleState({key: "reg", value: emailResult });
            handleState({key: "result", value: e.target.value });
        }
    }

    return(
        <FormInput
            ref={inputRef}
            active={active}
            validate={validate}
            type={(validate === "pw" || validate === "pw-cfrm") ? "password" : "text"}
            onChange={validateInputs}
            onFocus={handleACtive}
            onBlur={handleACtive} />
    );
}

export const SearchInput = () => {
    return(
        <InputSearchContainer>
            <span className="heading">검색</span>
            <InputSearch placeholder="불타는 중2병의..."/>
            <div className="btn-wrapper">
                <button className="btn-clear"><FontAwesomeIcon icon={faCircleXmark}/></button>
                <button className="btn-search"><FontAwesomeIcon icon={faMagnifyingGlass}/></button>
            </div>
        </InputSearchContainer>
    );
}