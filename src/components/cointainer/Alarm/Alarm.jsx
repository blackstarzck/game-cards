import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowRotateRight, faBells, faCommentDots, faFaceHeadBandage, faHandshakeSimple, faPersonCircleCheck, faSword, faTrophy, faXmark, faBan, faDove } from '@fortawesome/pro-light-svg-icons'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { AlarmListStyles, AlarmStyles } from './Alarm.elements'
import Database from '../../../service/database'
import { setInitDatas } from '../../../data/data'

library.add(faBan, faXmark, faArrowRotateRight, faBells, faSword, faCommentDots, faFaceHeadBandage, faHandshakeSimple, faPersonCircleCheck, faTrophy, faDove);

const db = new Database();
// db.getSingleData("ALARM_TABLE", "chanki1004");


const Alarm = ({login, mainPopup, setMainPopup, alarm, setAlarm}) => {
    const [ bullet, setBullet ] = useState(false);
    const [ step1, setStep1 ] = useState(false);
    const [ step2, setStep2 ] = useState(false);
    const [ close, setClose ] = useState(false);
    const [ className, setClassName ] = useState({ class: "" });

    const readAllAlarms = async () => {
        setBullet(false);
        const write = await setAlarm((alarm) => {
            const copied = { ...alarm };
            copied.data.map((item) => item.READ_STATE = "Y" );

            console.log("copied: ", copied);
            db.writeNewDataV2("ALARM_TABLE", login.ID, copied);
            return copied;
        });
    }

    const showStep1 = () => setStep1(!step1); 
    const showStep2 = () => {
        setStep2(!step2);
        step2 || readAllAlarms();
    }
    const closeAll = () => {
        setClose(!close);
        setTimeout(() => {
            setStep1(false);
            setStep2(false);
            setClose(false);
        }, 140);
    }

    useEffect(() => {
        console.log("alarm: ", alarm);
        for(let i = 0; i < alarm.data.length; i++){
            if(alarm.data[i].READ_STATE === "N") setBullet(true);
        }
    }, [alarm])

    useEffect(() => {
        let class1 = "", class2 = "", class3 = "", showBullet = "";

        if(login.state){
            class1 = step1 ? "active-step1" : "";
            class2 = step2 ? "active-step2" : "";
            class3 = close ? "close" : "";
            showBullet = bullet ? "new-alarm" : "";
        }else{
            setStep1(false);
            setStep2(false);
        }

        setClassName({ class: `${showBullet} ${class1} ${class2} ${class3}` });
    }, [login, step1, step2, bullet]);

    return (
        <>
            <AlarmStyles className={className.class} login={login.state}>
                { (step1 && step2) ?
                    <button className="btn-close" onClick={() => login.state && closeAll()}><FontAwesomeIcon icon={faXmark}/></button> :
                    <button className="btn-alarm" onClick={() => login.state && showStep1()}><FontAwesomeIcon icon={faBells}/></button> }
                <div className="title-wrapper" onClick={() => login.state && showStep2()}>
                    <span className="alarm-title">알림내역</span>
                    <span className="alarm-total">총 <b>{alarm?.data?.length}</b>개</span>
                </div>
                <div className="lists-wrapper">
                    <div className="outer">
                        <ul className="inner">
                            { alarm?.data?.map((item, i) =>
                                <AlarmList
                                    mainPopup={mainPopup}
                                    setMainPopup={setMainPopup}
                                    key={i}
                                    alarm={item} /> ) }
                        </ul>
                    </div>
                </div>
            </AlarmStyles>
        </>
    )
}

export default Alarm

const AlarmList = ({alarm, mainPopup, setMainPopup}) => {
    const [ msg, setMsg ] = useState({ icon: "", msg1: "", msg2: "", state: "" }); 

    const handleClick = (type) => {
        // RULE: 수신한 알람에 대해서만 팝업을 노출해야 한다.
        // BTL_REQ_RECV - 발송인의 이름/이메일, 메시지
        // FRD_REQ_RECV - 발송인의 이름/이메일
        // MSG_RECV - 친구목록 컨텐츠로 스크롤 이동시켜준다.
        if(type !== "BTL_REQ_RECV" && type !== "FRD_REQ_RECV" && type !== "MSG_RECV") return;

        const data = {
            id: alarm.TRG_ID,
            email: alarm.TRG_EMAIL,
            name: alarm.TRG_NAME,
            msg: alarm.MSG, date:
            alarm.TIME_STAMP,
            key: alarm.KEY,
            bet: alarm.BET_DESCR
        };
        setMainPopup({ state: true, type, data });
    }

    useEffect(() => {
        if(alarm.ALARM_TYPE === "BTL_REQ_SENT") setMsg({ icon: "fa-sword", msg1: "님께 대결을 신청하셨습니다.", msg2: "", state: "발송" });
        if(alarm.ALARM_TYPE === "BTL_REQ_RECV") setMsg({ icon: "fa-sword", msg1: "님께서 대결을 신청하셨습니다.", msg2: "", state: "수신" });
        if(alarm.ALARM_TYPE === "BTL_REQ_DENIED") setMsg({ icon: "fa-ban", msg1: "님께서 대결을 ", msg2: "거절", msg3: "하셨습니다.", state: "수신" });
        if(alarm.ALARM_TYPE === "BTL_VICT") setMsg({ icon: "fa-trophy", msg1: "님과의 대결에서 ", msg2: "승리", msg3: "하셨습니다.", state: "수신" });
        if(alarm.ALARM_TYPE === "BTL_DFT") setMsg({ icon: "fa-face-head-bandage", msg1: "님과의 대결에서 ", msg2: "패배", msg3: "하셨습니다.", state: "수신" });
        if(alarm.ALARM_TYPE === "BTL_DRAW") setMsg({ icon: "fa-dove", msg1: "님과의 대결에서 ", msg2: "무승부", msg3: "하셨습니다.", state: "수신" });
        if(alarm.ALARM_TYPE === "FRD_REQ_SENT") setMsg({ icon: "fa-handshake-simple", msg1: "님께 친구요청을 하셨습니다.", msg2: "", state: "발송" });
        if(alarm.ALARM_TYPE === "FRD_REQ_RECV") setMsg({ icon: "fa-handshake-simple", msg1: "님께서 친구요청을 하셨습니다.", msg2: "", state: "수신" });
        if(alarm.ALARM_TYPE === "FRD_AGR") setMsg({ icon: "fa-person-circle-check", msg1: "님과 친구가되었습니다. ", msg2: "", msg3: "", state: "수신" });
        if(alarm.ALARM_TYPE === "FRD_DSAGR") setMsg({ icon: "fa-ban", msg1: "님과 친구가되지 못하였습니다.", msg2: "", msg3: "", state: "수신" });
        if(alarm.ALARM_TYPE === "MSG_RECV") setMsg({ icon: "fa-comment-dots", msg1: "님께서 메시지를 보내셨습니다.", msg2: "", state: "수신" });
    }, [alarm]);
    
    return(
        <AlarmListStyles onClick={(e) => alarm.RESULT === "N" && handleClick(alarm.ALARM_TYPE)}>
            <div className="msg-wrapper">
                <div className="icon">
                    { msg.icon && <FontAwesomeIcon icon={`fa-light ${msg.icon}`} /> }
                </div>
                <div className="wrapper">
                    <span className="msg">
                        <b className="sender">{alarm.TRG_NAME}</b>
                        { msg.msg1 }
                        { msg.msg2 && <b className="bold">{msg.msg2}</b> }
                        { msg.msg3 && msg.msg3 }
                    </span>
                    <span className="date">{alarm.TIME_STAMP}</span>
                </div>
            </div>
            <span className="msg-state">{msg.state}</span>
        </AlarmListStyles>
    );
}