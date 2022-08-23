import React, { useEffect, useRef, useState } from 'react'
import { ButtonWrapper, CardContainer, TextStyle, ViewStyle } from './Card.element'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsersMedical } from '@fortawesome/pro-light-svg-icons'
import loadingImg from '../../../assets/images/loading.png'
import { ButtonCardDelete, ButtonCardInfo, ButtonSelectCard } from '../../Button/Button'
import { gsap } from "gsap"
import { faCirclePlus } from '@fortawesome/pro-solid-svg-icons'
import { detectGIF } from '../../../util/util'

const Card = ({login, info}) => {
    const [ detailVisible, setDetailVisible ] = useState(false);
    const [ groupVisible, setGroupVisible ] = useState(false);

    const showCardDetail = () => setDetailVisible(!detailVisible);
    const showGroupSelectBox = () => { login.state && setGroupVisible(!groupVisible); }

    const [ load, setLoad ] = useState({ url: "", state: false });

    return (
        <CardContainer>
            <CardView
                login={login}
                info={info}
                load={load}
                setLoad={setLoad}
                groupVisible={groupVisible}
                showGroupSelectBox={showGroupSelectBox}
                detailVisible={detailVisible } />
            <CardText
                login={login}
                load={load}
                info={info} />
            { (login.state && load.state) && 
                <ButtonContainer
                    info={info}
                    detailVisible={detailVisible}
                    showCardDetail={showCardDetail} /> }
        </CardContainer>
    )
}

export default Card

export const CardView = ({login, info, detailVisible, groupVisible, showGroupSelectBox, setLoad, load}) => {
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
                { login.state && <CardDetails
                    info={info}
                    detailVisible={detailVisible}/> }
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
                    <li onClick={showGroupSelectBox} className="group-numb">1</li>
                    <li onClick={showGroupSelectBox} className="group-numb">2</li>
                    <li onClick={showGroupSelectBox} className="group-numb">3</li>
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

    const reverseFun = () => {
        tl.current.reverse();
        setTimeout(() => {
            el.current.style.visibility = "hidden";
            el.current.style.zIndex = -1;
        }, 400)
    }

    return(
        <div ref={el} className="card-details-wrapper">
            <div className="inner">
                <div className="top">
                    <div className="left">
                        <ul>
                            <li className="row"><span>STR</span><span>{info.STR}</span></li>
                            <li className="row"><span>AGI</span><span>{info.AGI}</span></li>
                            <li className="row"><span>DEX</span><span>{info.DEX}</span></li>
                            <li className="row"><span>VIT</span><span>{info.VIT}</span></li>
                            <li className="row"><span>INT</span><span>{info.INT}</span></li>
                            <li className="row"><span>LUCK</span><span>{info.LUCK}</span></li>
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
                                <span className="job-name">{info.JOB || "-"}</span>
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

export const ButtonContainer = ({detailVisible, showCardDetail}) => {
    return(
        <ButtonWrapper>
            <ButtonCardInfo detailVisible={detailVisible} onClick={showCardDetail} />
            <ButtonSelectCard />
            <ButtonCardDelete />
        </ButtonWrapper>
    );
}