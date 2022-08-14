import React, { useState, useEffect, useRef, useCallback } from 'react'
import { ButtonTextClear, ButtonArrowDown } from '../Button/Button'
import { Wrapper, NickNameInput, JobSelect, ContainerSelect } from './input.elements'
import Database from '../../service/database'
import { gsap } from "gsap"

export const InputNickName = ({...props}) => {
    const target = props.mainCard["nickName"];
    const inputRef = useRef();

    return(
        <Wrapper className="input-wrapper">
            <NickNameInput 
                ref={inputRef}
                name="nickName" 
                placeholder="원하는 이름을 입력하세요" 
                onChange={props.onChange}
                value={target || ""}
            />
            { target && <ButtonTextClear target={"nickName"} updateCard={props.updateCard} /> }
        </Wrapper>
    );
}

export const SelectJob = ({mainCard, updateCard}) => {
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
                <JobSelect>{mainCard.job || jobLists[0].KR}</JobSelect>
                <ButtonArrowDown clickState={clicked}/>
            </Wrapper>
            <JobLists
                clickState={clicked}
                list={jobLists}
                cardKey={"job"}
                updateCard={updateCard}
                handleDropDown={handleDropDown}
            />
        </Wrapper>
    );
}

export const JobLists = ({ list, cardKey, updateCard, clickState, handleDropDown }) => {
    const el = useRef(null);
    const tl = useRef(null);
    const toggle = clickState;
    let pos = 0;

    useEffect(() => {
        pos = el.current.parentNode.offsetHeight;

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

    const onClick = name => {
        reverseFun();
        updateCard({ key: cardKey, value: name });
        handleDropDown(!clickState);
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
                <li ref={el} key={list.key} onClick={ () => onClick(list.KR) }>
                    <span>{list.KR}</span>
                    <span>{list.EN}</span>
                </li>
            ))}
        </ContainerSelect>
    );
}