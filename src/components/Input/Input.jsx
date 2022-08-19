import React, { useState, useEffect, useRef } from 'react'
import { ButtonTextClear, ButtonArrowDown, ButtonSearch } from '../Button/Button'
import { Wrapper, NickNameInput, JobSelect, ContainerSelect, FrdSrchInput, EmailInput, PwdInput } from './input.elements'
import { gsap } from "gsap"

export const InputNickName = ({names, handleNames}) => {
    const [ inputVal, setInputVal ] = useState("");
    const inputRef = useRef();

    const onChnage = (evt) => {
        const { value } = evt.target;
        setInputVal(value);
        handleNames({ key: "nickName", value });
    }
    
    return(
        <Wrapper className="input-wrapper">
            <NickNameInput 
                ref={inputRef}
                name="nickName" 
                value={names.nickName}
                placeholder="원하는 이름을 입력하세요" 
                onChange={onChnage} />
            { inputVal && <ButtonTextClear
                target={"nickName"}
                setInputVal={setInputVal}
                handleNames={handleNames} /> }
        </Wrapper>
    );
}

export const SelectJob = ({names, updateCard, handleNames, imgLoaded}) => {
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

    // const data = new Database();
    // const jobs = data.getData("JOB_INFO");

    // useEffect(() => {
    //     jobs.then((result) => {
    //         setJobLists(result[0].JOBS);
    //     });
    // }, []);

    useEffect(() => {
        updateCard({ key: "jobKR", value: jobLists[0].KR }); // 초기값 세팅
        updateCard({ key: "jobEN", value: jobLists[0].EN }); // 초기값 세팅
        handleNames({ key: "jobKR", value: jobLists[0].KR });
        handleNames({ key: "jobEN", value: jobLists[0].EN });
    }, [jobLists]);

    const handleDropDown = (state) => {
        setClicked(state);
    }

    if(jobLists === null){
        // 로딩화면
        return <h1>받아오는중...</h1>;
    }else{
        // consoe.log(jobLists);
    }

    return(
        <Wrapper className="job-wrapper">
            <Wrapper className="show-selected" onClick={ () => handleDropDown(!clicked) }>
                <JobSelect>{names.jobKR || jobLists[0].KR}</JobSelect>
                <ButtonArrowDown clickState={clicked}/>
            </Wrapper>
            <JobLists
                clickState={clicked}
                imgLoaded={imgLoaded}
                list={jobLists}
                jobKR={"jobKR"}
                handleDropDown={handleDropDown}
                handleNames={handleNames}
            />
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
        reverseFun();
        handleDropDown(clickState);
        handleNames({ key: "jobEN", value: en });
        handleNames({ key: "jobKR", value: kr });
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
        setInputVal((inputVal) => inputVal = value);
    }
    return(
        <Wrapper className="search-wrapper">
            <FrdSrchInput 
                readOnly={ login ? false : true }
                ref={inputRef}
                placeholder={login ? "친구를 검색해보세요" : "로그인 후 이용가능합니다."}
                value={inputVal || ""}
                onChange={onChnage} 
                onKeyPress={(e) => e.key === "Enter" && searchFunc(inputVal)} />

            { inputVal && <ButtonTextClear
                className={"btn-clear"}
                target={""}
                setInputVal={setInputVal} /> }
                <ButtonSearch login={login} searchFunc={() => inputVal && searchFunc(inputVal)}/>
        </Wrapper>
    );
}

export const InputEmail = () => {
    const [ active, setActive ] = useState(false);

    return(
        <EmailInput
            active={active}
            onFocus={() => setActive(true)}
            onBlur={() => setActive(false)} />
    );
}
export const InputPwd = () => {
    const [ active, setActive ] = useState(false);

    return(
        <PwdInput
            active={active}
            onFocus={() => setActive(true)}
            onBlur={() => setActive(false)} />
    );
}