import React, { useState, useEffect, useRef } from 'react'
import { ButtonStat, ButtonSkill, ButtonReset, ButtonSave, ButtonViewInfo, ButtonKeepCard, ButtonLevelUp, ButtonSaveTitle, ButtonStatAdd, ButtonStatRemove, ButtonEditTitle } from '../../Button/Button'
import { InputNickName, SelectJob } from '../../Input/Input'
import { TitleJob, TitleNickName } from '../../Texts/Texts'
import { BookMark, CardImg, StatHeading, StatItem, StatPoints, Wrapper } from './MainView.elements'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/pro-solid-svg-icons'
import { gsap } from "gsap"
import { DescrPopup } from '../../Popups/Popups'

const MainView = ({...props}) => {
    const [ editState, setEditState ] = useState(true);
    const [ view, setView] = useState(false);

    const handleEditState = () => setEditState(!editState);
    const viewCardInfo = () => setView(!view);

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
                        {props.mainCard.imgURL && <BookMark>
                            <FontAwesomeIcon icon={faBookmark} />
                            <span className="group-no">{props.mainCard.groupNo || "-"}</span>
                        </BookMark>}

                        <CardImg>
                            { props.mainCard.imgURL ? 
                                <img src={props.mainCard.imgURL}/> :
                                <span>이미지를 업로드하세요</span> }
                        </CardImg>
                        
                        {/* RANK */}
                        {props.mainCard.imgURL && <Wrapper className="text-wrapper">
                            <span className="level"><b>Lv.</b>{props.mainCard.level}</span>
                            <span className="pref-rank">선호순위 {props.mainCard.selected || "-"}위</span>
                        </Wrapper>}
                    </Wrapper>

                    {/* STORY */}
                    <MainViewStoryBox mainCard={props.mainCard} view={view}/>

                    {/* EXPERIENCE */}
                    <Wrapper className="exp-wrapper" exp={props.mainCard.exp}>
                        <ButtonLevelUp />
                        <div className="outer">
                            <div className="inner" ></div>
                        </div>
                    </Wrapper>
                </Wrapper> 
            </Wrapper>
            <Wrapper className="btn-handlers">
                <ButtonReset imgLoaded={props.imgLoaded} />
                <ButtonSave imgLoaded={props.imgLoaded} />
                <ButtonViewInfo imgLoaded={props.imgLoaded} viewCardInfo={viewCardInfo}/>
                <ButtonKeepCard imgLoaded={props.imgLoaded} />
            </Wrapper>
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
            <h4>{mainCard.quote || "..."}</h4>
            <p>{mainCard.descr || "..."}</p>
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
            <span className="total-points">{mainCard.remain}</span>
            <Wrapper className="list-wrapper">
                {keyArray.map((list, i) => <MainViewStat
                    imgLoaded={imgLoaded}
                    visible={visible}
                    setVisible={setVisible}
                    key={i}
                    heading={list}
                    points={mainCard.stats[list]} /> )}
            </Wrapper>
        </Wrapper>
    );
}

export const MainViewStat = ({imgLoaded, heading, points, visible, setVisible }) => {
    const [ popup, setPopup ] = useState(false);
    const handleVisible = () => {
        console.log(1);
        setVisible({...visible, target: heading});
        setPopup(!popup);
        // imgLoaded && setVisible((visible) => visible = heading );
    }

    return(
        <StatItem>
            <StatHeading
                onClick={() => imgLoaded && handleVisible()}
                className="heading"
                imgLoaded={imgLoaded}>{heading}
                { imgLoaded && <DescrPopup
                    popup={popup}
                    setPopup={setPopup}
                    statName={heading}
                    visible={visible} /> }
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
                <TitleNickName imgLoaded={imgLoaded}>{ imgLoaded ? mainCard.nickName : "-" }</TitleNickName>
                <TitleJob imgLoaded={imgLoaded}>{ imgLoaded ? mainCard.jobEN : "-" }</TitleJob>
            </Wrapper>
        </Wrapper>
    );
};

export const MainViewEditName = ({handleEditState, updateCard, mainCard, active, imgLoaded}) => {
    const [ names, setNames ] = useState({
        nickName: "", jobKR: "", jobEN: ""
    });

    const handleNames = obj => {
        console.log("handleNames:", obj);
        setNames((names) => {
            const updated = {...names};
            updated[obj.key] = obj.value;
            return updated;
        });
    }

    useEffect(() => {
        // console.log("MainViewEditName:", names);
        // console.log(mainCard);
    }, [names]);

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
                    handleNames={handleNames}
                />
                <SelectJob
                    updateCard={updateCard} 
                    names={names} 
                    handleNames={handleNames}
                >
                </SelectJob>
            </Wrapper>
        </Wrapper>
    );
};
