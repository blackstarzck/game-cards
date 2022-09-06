import React, { memo, useEffect, useRef, useState } from 'react'
import { ButtonWrapper, CardContainer, TextStyle, ViewStyle } from './Card.element'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsersMedical } from '@fortawesome/pro-light-svg-icons'
import loadingImg from '../../../assets/images/loading.png'
import { ButtonCardDelete, ButtonCardInfo, ButtonSelectCard } from '../../Button/Button'
import { gsap } from "gsap"
import { faCirclePlus } from '@fortawesome/pro-solid-svg-icons'
import { detectGIF } from '../../../util/util'
import Database from '../../../service/database'
import { setInitDatas } from '../../../data/data'

const db = new Database();

const Card = ({login, info, cards, setCards, setReady, deleteSelectedCard, mainPopup, setMainPopup, mainCard, setMainCard, selectNewOrPrev}) => {
    const [ detailVisible, setDetailVisible ] = useState(false);
    const [ groupVisible, setGroupVisible ] = useState(false);

    const showCardDetail = () => setDetailVisible(!detailVisible);

    const showGroupSelectBox = (number) => {
        if(login.state){
            setGroupVisible(!groupVisible);
  
            if(typeof number === "number"){
                const copied = {...cards};
                const { KEY, CODE, POWER, QUOTE, LEVEL, NICK, IMG_URL } = info;
                const { STR, AGI, DEX, VIT, INT, LUCK } = info.STATS;
                const newMember =  { KEY, CODE, POWER, QUOTE, LEVEL, NICK, IMG_URL, STR, AGI, DEX, VIT, INT, LUCK }; // GROUP에 넣을 정보
                const copiedCards = copied["CARDS"];
                let members = copied["GROUPS"][`NO${number}`]["MEMBERS"];
                const groups = [ "NO1", "NO2", "NO3" ];
                let powerSum = 0;
                let temp;

                if(members.length < 3){
                    for(let m = 0; m < groups.length; m++){
                        // let sum = 0;
                        temp = copied["GROUPS"][`${groups[m]}`]["MEMBERS"];
                        for(let t = 0; t < temp.length; t++){
                            if(temp[t]["KEY"] === info["KEY"]){
                                copied["GROUPS"][`${groups[m]}`]["MEMBERS"].splice(t, 1); // 중복 전부 삭제
                            }
                        }
                    }

                    members = copied["GROUPS"][`NO${number}`]["MEMBERS"]; // splice되었기 때문에 다시 선언

                    copied["GROUPS"][`NO${number}`]["MEMBERS"] = [ ...members, newMember ]; // 그룹지정

                    for(let n = 0; n < copiedCards.length; n++){ // 그룹 지정
                        if(copiedCards[n]["GROUP_NO"] != number && copiedCards[n]["KEY"] === info["KEY"]){
                            copiedCards[n]["GROUP_NO"] = number;
                        }
                    }

                    for(let m = 0; m < groups.length; m++){
                        let sum = 0;
                        temp = copied["GROUPS"][`${groups[m]}`]["MEMBERS"];
                        for(let t = 0; t < temp.length; t++){
                            sum = sum + (temp.length > 0 ? temp[t]["POWER"] : 0 ); // 멤버들 전투력 합산
                        }
                        copied["GROUPS"][`${groups[m]}`]["GROUP_POWER"] = sum;
                    }

                    setCards(cards => cards = copied);
                    setReady(setInitDatas("BTL_DT", "DETAIL")); // reset
                    db.writeNewData("USER_CARDS", login.ID, copied);
                }else{
                    if(info["GROUP_NO"] != number){
                        alert(`그룹 ${number}번에 추가할 수 없습니다.`);
                    }
                }
            }
        }
    }

    const [ load, setLoad ] = useState({ url: "", state: false });


    return (
        <CardContainer>
            <CardView
                login={login}
                info={info}
                load={load}
                cards={cards}
                setLoad={setLoad}
                groupVisible={groupVisible}
                showGroupSelectBox={showGroupSelectBox}
                detailVisible={detailVisible } />
            <CardText
                login={login}
                load={load}
                info={info} />
            { (login.state && load.state && info.CODE) && 
                <ButtonContainer
                    info={info}
                    setMainCard={setMainCard}
                    selectNewOrPrev={selectNewOrPrev}
                    setMainPopup ={setMainPopup}
                    detailVisible={detailVisible}
                    showCardDetail={showCardDetail}
                    deleteSelectedCard={deleteSelectedCard} /> }
        </CardContainer>
    )
};

export default Card

export const CardView = ({login, info, detailVisible, groupVisible, showGroupSelectBox, setLoad, load, ready, setReady}) => {
    const setImgURL = () => {
        if(info.CODE){
            const fileName = detectGIF(info.CODE);
            const dir = info.CODE.split("-")[1];
            const url = `https://firebasestorage.googleapis.com/v0/b/card-maker-89016.appspot.com/o/${dir}%2F${info.CODE}.${fileName}?alt=media`;
           return url
        }
    }

    useEffect(() => {
        const img = new Image();
        const url = setImgURL();
        img.src = url
        img.onload = () => setLoad({url, state: true});
    }, [info]);

    return(
        <ViewStyle>
            <div className="main-view">
                {/* 그룹 선택 */}
                { (login.state && info.CODE) &&
                <GrounpSelect
                    info={info}
                    groupVisible={groupVisible}
                    showGroupSelectBox={showGroupSelectBox}/> }

                 {/* 이미지 */}
                 <div className="img-box">
                    { (login.state && info.CODE) ? 
                        ( load.state ? 
                            <img src={load.url} alt="" /> :
                            <div className="loading"><img src={loadingImg} alt="" /></div> ) :
                        <FontAwesomeIcon icon={faCirclePlus} /> }
                 </div>

                {/* 카드 정보 */}
                <CardDetails
                    info={info}
                    detailVisible={detailVisible} />
            </div>
        </ViewStyle>
    );
}

export const GrounpSelect = ({info, groupVisible, showGroupSelectBox}) => {
    const el = useRef(null);
    const tl = useRef(null);

    useEffect(() => {
        tl.current = gsap.timeline({ pause: true });
        tl.current.fromTo(el.current, { y: 24, height: 0 },{
            y: 28, height: 74, duration: .1,
            onStart: function(){
                el.current.style.visibility = "visible"
                el.current.style.zIndex = 3;
            }
        });
    }, []);

    useEffect(() => {
        groupVisible ? tl.current.play() : reverseFun();
    },[groupVisible]);

    const reverseFun = () => {
        tl.current.reverse();
        setTimeout(() => {
            el.current.style.visibility = "hidden";
            el.current.style.zIndex = -1;
        }, 100)
    }

    return(
        <div className="group-select-wrapper">
            <div className="group-no" onClick={showGroupSelectBox}>
                <FontAwesomeIcon icon={faUsersMedical} />
                <span className="group-numb">{ info.GROUP_NO ? info.GROUP_NO : "-" }</span>
            </div>
            <div ref={el} className="group-select-box">
                <ul>
                    <li onClick={() => showGroupSelectBox(1)} className="group-numb">1</li>
                    <li onClick={() => showGroupSelectBox(2)} className="group-numb">2</li>
                    <li onClick={() => showGroupSelectBox(3)} className="group-numb">3</li>
                </ul>
            </div>
        </div>
    );
}

export const CardDetails = ({info, detailVisible}) => {
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
        detailVisible ? tl.current.play() : reverseFun();
    },[detailVisible]);

    useEffect(() => {
        if(info.CODE){
            let sortArray = [];
            sortArray.push({ name: "STR", stat: info.STATS.STR });
            sortArray.push({ name: "AGI", stat: info.STATS.AGI });
            sortArray.push({ name: "DEX", stat: info.STATS.DEX });
            sortArray.push({ name: "VIT", stat: info.STATS.VIT });
            sortArray.push({ name: "INT", stat: info.STATS.INT });
            sortArray.push({ name: "LUCK", stat: info.STATS.LUCK });
            const strongStat = sortArray.sort((a, b) => { return a.stat > b.stat ? -1 : a.stat < b.stat ? 1 : 0; })[0].name;
            document.querySelectorAll(`.card-${info.KEY} .point`).forEach(item => item.classList.remove("active") );
            document.querySelector(`.card-${info.KEY} .point-${strongStat}`).classList.add("active");
        }
    }, [info]);

    const reverseFun = () => {
        tl.current.reverse();
        setTimeout(() => {
            el.current.style.visibility = "hidden";
            el.current.style.zIndex = -1;
        }, 400)
    }

    return(
        <div ref={el} className={`card-details-wrapper card-${info.KEY}`}>
            <div className="inner">
                <div className="top">
                    <div className="left">
                        <ul>
                            <li className="row"><span>STR</span><span className="point point-STR">{info.STATS.STR}</span></li>
                            <li className="row"><span>AGI</span><span className="point point-AGI">{info.STATS.AGI}</span></li>
                            <li className="row"><span>DEX</span><span className="point point-DEX">{info.STATS.DEX}</span></li>
                            <li className="row"><span>VIT</span><span className="point point-VIT">{info.STATS.VIT}</span></li>
                            <li className="row"><span>INT</span><span className="point point-INT">{info.STATS.INT}</span></li>
                            <li className="row"><span>LUCK</span><span className="point point-LUCK">{info.STATS.LUCK}</span></li>
                        </ul>
                    </div>
                    <div className="right">
                        <span className="text">선호도 순위</span>
                        <span className="pref-rank">{info.PREF_RANK}</span>
                    </div>
                </div>
                <div className="bottom">
                    <span className="quote">{info.QUOTE}</span>
                    <p className="descr">{info.DESCR}</p>
                </div>
            </div>
        </div>
    );
}

export const CardText = ({login, info, load}) => {
    return(
        <TextStyle>
            <div className="text-wrapper">
                { (login.state && info.CODE) ?
                    ( load.state ?
                        <>
                            <div className="name-wrapper">
                                <span className="nick-name">{info.NICK || "-"}</span>
                                <span className="job-name">{info.JOB_EN || "-"}</span>
                            </div>
                            <div className="level-wrapper">
                                <span><b>Lv.</b>{info.LEVEL}</span>
                            </div>
                        </> :
                        <span className="title loading">LOADING</span> ) :
                    <span className="title standby">NAME</span> }
            </div>
        </TextStyle>
    );
}

export const ButtonContainer = ({info, detailVisible, showCardDetail, setMainPopup, setMainCard, selectNewOrPrev}) => {
    const handleMoveToMainView = () => {
        let moveTo = document.querySelector(".main-view").offsetTop;
        window.scrollTo(0, moveTo);
        setMainCard(info);
        selectNewOrPrev("PREV");
    }
    const handleDelete = () => {
        setMainPopup({ state: true, type: "DELETE_CARD", data: info });
    }

    return(
        <ButtonWrapper>
            <ButtonCardInfo detailVisible={detailVisible} onClick={showCardDetail} />
            <ButtonSelectCard handleClick={handleMoveToMainView} remain={info.REMAIN}/>
            <ButtonCardDelete handleClick={handleDelete} />
        </ButtonWrapper>
    );
}