import React, { useState, useEffect, useRef, forwardRef } from 'react'
import { ButtonStat, ButtonSkill, ButtonReset, ButtonSave, ButtonViewInfo, ButtonKeepCard, ButtonLevelUp, ButtonSaveTitle, ButtonStatAdd, ButtonStatRemove, ButtonEditTitle } from '../../Button/Button'
import { InputNickName, SelectJob } from '../../Input/Input'
import { TitleJob, TitleNickName } from '../../Texts/Texts'
import { BookMark, CardImg, StatHeading, StatItem, StatPoints, Wrapper } from './MainView.elements'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/pro-solid-svg-icons'
import { gsap } from "gsap"
import { DescrPopup, Notice } from '../../Popups/Popups'
import loadingSrc from '../../../assets/images/loading.png'
import Database from '../../../service/database'

const db = new Database();

const MainView = ({...props}) => {
    const [ editState, setEditState ] = useState(true);
    const [ view, setView] = useState(false);
    const [ notice, setNotice ] = useState({
        type: "", state: false
    });

    const handleEditState = () => setEditState(!editState);
    const viewCardInfo = () => setView(!view);

    const resetStats = () => {
        if(!props.mainCard.KEY) return
        document.querySelector(".STR").innerText = props.mainCard.STATS.STR;
        document.querySelector(".AGI").innerText = props.mainCard.STATS.AGI;
        document.querySelector(".DEX").innerText = props.mainCard.STATS.DEX;
        document.querySelector(".VIT").innerText = props.mainCard.STATS.VIT;
        document.querySelector(".INT").innerText = props.mainCard.STATS.INT;
        document.querySelector(".LUCK").innerText = props.mainCard.STATS.LUCK;
        document.querySelector(".total-points").innerText = props.mainCard.REMAIN;
    }

    const saveStats = () => {
        if(!props.mainCard.KEY) return
        const STR = Number(document.querySelector(".STR").innerText);
        const AGI = Number(document.querySelector(".AGI").innerText);
        const DEX = Number(document.querySelector(".DEX").innerText);
        const VIT = Number(document.querySelector(".VIT").innerText);
        const INT = Number(document.querySelector(".INT").innerText);
        const LUCK = Number(document.querySelector(".LUCK").innerText);
        const REMAIN = Number(document.querySelector(".total-points").innerText);
        const STATS = { STR, AGI, DEX, VIT, INT, LUCK };
        const POWER = STR + AGI + DEX + VIT + INT + LUCK;
        const result = { ...props.mainCard, POWER, REMAIN, STATS }

        setNotice({ type: "saved", state: true });

        props.setMainCard(result);
        props.setCards((cards) => {
            const updated = { ...props.cards };
    
            for(let i = 0; i < updated.CARDS.length; i++){
              if(updated.CARDS[i].KEY === result.KEY){
                updated.CARDS[i] = result;
                break;
              }
            }
            db.writeNewData("USER_CARDS", props.login.ID, updated);
            return updated
        });
    }

    useEffect(() => {
        const img = new Image();
        img.src = props.imgSrc || props.mainCard.IMG_URL;
        img.onload = () => props.setImgLoaded(true);
    }, [props.mainCard]);

    return (
        <Wrapper className="main-view">
            {/* SWITCH */}
            <Wrapper className="ability-btns">
                <ButtonStat imgLoaded={props.imgLoaded} remain={props.mainCard.REMAIN}/>
                {/* <ButtonSkill disable imgLoaded={props.imgLoaded} /> */}
            </Wrapper>

            {/* NAME EDIT */}
            <MainViewName
                imgLoaded={props.imgLoaded}
                active={editState} 
                mainCard={props.mainCard} 
                handleEditState={handleEditState} />
            <MainViewEditName
                imgLoaded={props.imgLoaded}
                active={!editState} 
                mainCard={props.mainCard} 
                updateCard={props.updateCard} 
                handleEditState={handleEditState} />

            <Wrapper className="body">
                {/* STAT CTRL */}
                <MainViewStatContainer
                    mainCard={props.mainCard}
                    setMainCard={props.setMainCard}
                    imgLoaded={props.imgLoaded} />

                {/* CARD VIEW */}
                <Wrapper className="view-wrapper">
                    
                    <Wrapper className="view-box">
                        {/* BOOKMARK */}
                        {props.mainCard.IMG_URL && <BookMark>
                            <FontAwesomeIcon icon={faBookmark} />
                            <span className="group-no">{props.mainCard.GROUP_NO || "-"}</span>
                        </BookMark>}

                        <CardImg>
                            { (props.imgSrc || props.mainCard.IMG_URL) ?
                                ( props.imgLoaded ? 
                                    <img src={ props.mainCard.IMG_URL} /> : <img className="loading-img" src={loadingSrc} /> ) :
                                <span>이미지를 업로드하세요</span> }
                        </CardImg>
                        
                        {/* RANK */}
                        {props.mainCard.IMG_URL && <Wrapper className="text-wrapper">
                            <span className="level"><b>Lv.</b>{props.mainCard.LEVEL}</span>
                            <span className="pref-rank">선호순위 {props.mainCard.SELECTED || " -"} 위</span>
                        </Wrapper>}
                    </Wrapper>

                    {/* STORY */}
                    <MainViewStoryBox mainCard={props.mainCard} view={view}/>

                    {/* EXPERIENCE */}
                    <Wrapper className="exp-wrapper" exp={props.mainCard.EXP_PER}>
                        <div className="outer">
                            <div className={`inner ${ props.mainCard.EXP_PER && "active"}`}></div>
                        </div>
                    </Wrapper>
                </Wrapper> 
            </Wrapper>
            <Wrapper className="btn-handlers">
                <ButtonReset imgLoaded={props.imgLoaded} reset={resetStats} remain={props.mainCard.REMAIN} />
                <ButtonSave imgLoaded={props.imgLoaded} save={saveStats} remain={props.mainCard.REMAIN} />
                <ButtonViewInfo imgLoaded={props.imgLoaded} viewCardInfo={viewCardInfo}/>
                <ButtonKeepCard
                    cards={props.cards}
                    newCard={props.newCard}
                    notice={notice.state}
                    setNotice={setNotice}
                    editState={editState}
                    keepSelectedCard={props.keepSelectedCard}
                    upgradeCard={props.upgradeCard}
                    imgLoaded={props.imgLoaded}
                    mainCard={props.mainCard} />
            </Wrapper>
            <Notice
                type={notice.type}
                notice={notice.state}
                setNotice={setNotice}
                mainCard={props.mainCard} />
        </Wrapper>
    )
}

export default MainView;

export const MainViewStoryBox = ({mainCard, view}) => {
    const el = useRef(null);
    const tl = useRef(null);

    useEffect(() => {
        tl.current = gsap.timeline({ pause: true });
        tl.current.fromTo(el.current, { y: -3, opacity: 0 },{
            y: 0, opacity: 1, duration: .3,
            onStart: function(){
                el.current.style.visibility = "visible"
                el.current.style.zIndex = 3;
            }
        });
    }, []);

    useEffect(() => {
        view ? tl.current.play() : reverseFun();
    },[view]);

    const reverseFun = () => {
        tl.current.reverse();
        setTimeout(() => {
            el.current.style.visibility = "hidden";
            el.current.style.zIndex = -1;
        }, 400)
    }

    return(
        <Wrapper ref={el} className="story-box">
            <h4>{mainCard.QUOTE || "..."}</h4>
            <p>{mainCard.DESCR || "..."}</p>
        </Wrapper>
    );
}

export const MainViewStatContainer = ({mainCard, setMainCard, imgLoaded}) => {
    const keyArray = [ "STR", "AGI", "DEX", "VIT", "INT", "LUCK" ];
    const [ visible, setVisible ] = useState({ target: "", toggle: false });
    const remainRef = useRef(null);

    return(
        <Wrapper className="stat-wrapper" remain={mainCard.REMAIN}>
            <span ref={remainRef} className="total-points">{mainCard.REMAIN}</span>
            <Wrapper className="list-wrapper">
                {keyArray.map((list, i) => <MainViewStat
                    key={i}
                    imgLoaded={imgLoaded}
                    visible={visible}
                    setVisible={setVisible}
                    heading={list}
                    ref={remainRef}
                    mainCard={mainCard}
                    setMainCard={setMainCard}
                    points={mainCard.STATS[list]} /> )}
            </Wrapper>
        </Wrapper>
    );
}

export const MainViewStat = forwardRef( ({imgLoaded, heading, points, visible, setVisible, mainCard, setMainCard}, ref) => {
    const [ popup, setPopup ] = useState(false);
    const statRef = useRef(null);

    const handleVisible = () => {
        setVisible({...visible, target: heading});
        setPopup(!popup);
    }

    const increaseStat = () => {
        let remain = Number(ref.current.innerText);
        let stat = Number(statRef.current.innerText);

        if(remain > 0){
            remain = remain - 1;
            ref.current.innerText = remain;

            stat = stat + 1;
            statRef.current.innerText = stat;
        }
    }

    const decreaseStat = () => {
        let remain = Number(ref.current.innerText);
        let stat = Number(statRef.current.innerText);
        if(stat > mainCard.STATS[`${heading}`]){
            stat = stat - 1;
            remain = remain + 1;
            ref.current.innerText = remain;
            statRef.current.innerText = stat;
        }
    }

    return(
        <StatItem>
            <StatHeading
                onClick={() => imgLoaded && handleVisible()}
                className="heading"
                imgLoaded={imgLoaded}>{heading}
                <DescrPopup
                    popup={popup}
                    setPopup={setPopup}
                    statName={heading}
                    visible={visible} />
            </StatHeading>
            <StatPoints
                ref={statRef}
                remain={mainCard.REMAIN}
                className={`points ${heading}`} 
                imgLoaded={imgLoaded} >{points}
            </StatPoints>
            <Wrapper className="btn-wrapper">
                <ButtonStatAdd increase={increaseStat} />
                <ButtonStatRemove descrease={decreaseStat} />
            </Wrapper>
        </StatItem>
    );
});

export const MainViewName = ({imgLoaded, mainCard, active, handleEditState}) => {
    return(
        <Wrapper className='edit-wrapper' active={active}>
            { !mainCard.KEY && <ButtonEditTitle
                active={active} 
                imgLoaded={imgLoaded} 
                handleEditState={handleEditState} /> }

            <Wrapper className='input-wrapper'>
                <TitleNickName imgLoaded={imgLoaded}>{ imgLoaded ? mainCard.NICK : "-" }</TitleNickName>
                <TitleJob imgLoaded={imgLoaded}>{ imgLoaded ? mainCard.JOB_EN : "-" }</TitleJob>
            </Wrapper>
        </Wrapper>
    );
};

export const MainViewEditName = ({handleEditState, updateCard, mainCard, active, imgLoaded}) => {
    const [ names, setNames ] = useState({
        NICK: mainCard.NICK, JOB_KR: mainCard.JOB_KR, JOB_EN: mainCard.JOB_EN
    });

    const handleNames = obj => {
        setNames((names) => {
            const updated = {...names};
            updated[obj.key] = obj.value;
            return updated;
        });
    }

    return(
        <Wrapper className='select-wrapper' active={active} >
            <ButtonSaveTitle
                imgLoaded={imgLoaded}
                handleEditState={handleEditState}
                updateCard={updateCard} 
                mainCard={mainCard}
                names={names} />
            <Wrapper className='custom-wrapper'>
                <InputNickName
                    mainCard={mainCard}
                    names={names}
                    handleNames={handleNames} />
                <SelectJob
                    mainCard={mainCard}
                    updateCard={updateCard} 
                    names={names} 
                    handleNames={handleNames} />
            </Wrapper>
        </Wrapper>
    );
};
