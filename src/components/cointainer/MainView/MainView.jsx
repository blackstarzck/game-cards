import React, { useState, useEffect, useRef } from 'react'
import { ButtonStat, ButtonSkill, ButtonReset, ButtonSave, ButtonViewInfo, ButtonKeepCard, ButtonLevelUp, ButtonSaveTitle, ButtonStatAdd, ButtonStatRemove, ButtonEditTitle } from '../../Button/Button'
import { InputNickName, SelectJob } from '../../Input/Input'
import { TitleJob, TitleNickName } from '../../Texts/Texts'
import { BookMark, CardImg, StatHeading, StatItem, StatPoints, Wrapper } from './MainView.elements'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/pro-solid-svg-icons'
import { gsap } from "gsap"
import { CardKeepPopup, DescrPopup, MainPopup, Notice } from '../../Popups/Popups'
import loadingSrc from '../../../assets/images/loading.png'

const MainView = ({...props}) => {
    const [ editState, setEditState ] = useState(true);
    const [ view, setView] = useState(false);
    const [ notice, setNotice ] = useState(false);

    const handleEditState = () => setEditState(!editState);
    const viewCardInfo = () => setView(!view);

    useEffect(() => {
        const img = new Image();
        img.src = props.imgSrc || props.mainCard.IMG_URL;
        img.onload = () => props.setImgLoaded(true);
    }, [props.mainCard]);

    return (
        <Wrapper className="main-view">
            {/* SWITCH */}
            <Wrapper className="ability-btns">
                <ButtonStat imgLoaded={props.imgLoaded} />
                <ButtonSkill disable imgLoaded={props.imgLoaded} />
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
                onChange={props.onChange} 
                handleEditState={handleEditState} />

            <Wrapper className="body">
                {/* STAT CTRL */}
                <MainViewStatContainer
                    mainCard={props.mainCard}
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
                                    <img src={ props.mainCard.IMG_URL} /> : <img src={loadingSrc} /> ) :
                                <span>이미지를 업로드하세요</span> }
                        </CardImg>
                        
                        {/* RANK */}
                        {props.mainCard.IMG_URL && <Wrapper className="text-wrapper">
                            <span className="level"><b>Lv.</b>{props.mainCard.LEVEL}</span>
                            <span className="pref-rank">선호순위 {props.mainCard.SELECTED || "-"}위</span>
                        </Wrapper>}
                    </Wrapper>

                    {/* STORY */}
                    <MainViewStoryBox mainCard={props.mainCard} view={view}/>

                    {/* EXPERIENCE */}
                    <Wrapper className="exp-wrapper" exp={props.mainCard.EXP}>
                        <ButtonLevelUp imgLoaded={props.imgLoaded} />
                        <div className="outer">
                            <div className="inner"></div>
                        </div>
                    </Wrapper>
                </Wrapper> 
            </Wrapper>
            <Wrapper className="btn-handlers">
                <ButtonReset imgLoaded={props.imgLoaded} />
                <ButtonSave imgLoaded={props.imgLoaded} />
                <ButtonViewInfo imgLoaded={props.imgLoaded} viewCardInfo={viewCardInfo}/>
                <ButtonKeepCard
                    notice={notice}
                    setNotice={setNotice}
                    editState={editState}
                    keepSelectedCard={props.keepSelectedCard}
                    imgLoaded={props.imgLoaded}
                    mainCard={props.mainCard} />
            </Wrapper>
            <Notice
                target={"main-view"}
                notice={notice} setNotice={setNotice}
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

export const MainViewStatContainer = ({mainCard, imgLoaded}) => {
    const keyArray = [ "STR", "AGI", "DEX", "VIT", "INT", "LUCK" ];
    const [ visible, setVisible ] = useState({
        target: "", toggle: false
    });

    return(
        <Wrapper className="stat-wrapper">
            <span className="total-points">{mainCard.REMAIN}</span>
            <Wrapper className="list-wrapper">
                {keyArray.map((list, i) => <MainViewStat
                    imgLoaded={imgLoaded}
                    visible={visible}
                    setVisible={setVisible}
                    key={i}
                    heading={list}
                    points={mainCard.STATS[list]} /> )}
            </Wrapper>
        </Wrapper>
    );
}

export const MainViewStat = ({imgLoaded, heading, points, visible, setVisible }) => {
    const [ popup, setPopup ] = useState(false);
    const handleVisible = () => {
        setVisible({...visible, target: heading});
        setPopup(!popup);
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
                className="points" 
                imgLoaded={imgLoaded} >{points}
            </StatPoints>
            <Wrapper className="btn-wrapper">
                <ButtonStatAdd />
                <ButtonStatRemove />
            </Wrapper>
        </StatItem>
    );
}

export const MainViewName = ({imgLoaded, mainCard, active, handleEditState}) => {
    return(
        <Wrapper className='edit-wrapper' active={active}>
            <ButtonEditTitle
                active={active} 
                imgLoaded={imgLoaded} 
                handleEditState={handleEditState} />
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

    useEffect(() => {

    }, [names]);

    useEffect(() => {

    }, [mainCard]);

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
