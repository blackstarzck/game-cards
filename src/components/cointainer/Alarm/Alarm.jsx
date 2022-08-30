import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowRotateRight, faBells, faCommentDots, faFaceHeadBandage, faHandshakeSimple, faPersonCircleCheck, faSword, faTrophy, faXmark, faBan } from '@fortawesome/pro-light-svg-icons'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { AlarmListStyles, AlarmStyles } from './Alarm.elements'
import Database from '../../../service/database'
import { updateDoc } from 'firebase/firestore'

library.add(faBan, faXmark, faArrowRotateRight, faBells, faSword, faCommentDots, faFaceHeadBandage, faHandshakeSimple, faPersonCircleCheck, faTrophy);

const db = new Database();
// db.getSingleData("ALARM_TABLE", "chanki1004");


const Alarm = ({login}) => {
    const [ bullet, setBullet ] = useState(false);
    const [ step1, setStep1 ] = useState(false);
    const [ step2, setStep2 ] = useState(false);
    const [ close, setClose ] = useState(false);
    const [ className, setClassName ] = useState({ class: "" });
    const [ alarm, setAlarm ] = useState();

    const refresh = async () => {
        const result = await db.getSingleData("ALARM_TABLE", login.ID);
        let cnt = 0;
        result.data.map((item) => item.READ_STATE === "N" && cnt++);
        cnt > 0 ? setBullet(true) : setBullet(false);
        setAlarm(result);
    }

    const readAllAlarms = async () => {
        setBullet(false);
        const write = await setAlarm((alarm) => {
            const copied = { ...alarm };
            copied.data.map((item) => item.READ_STATE = "Y" );
            return copied;
        });
        db.writeNewDataV2("ALARM_TABLE", login.ID, alarm);
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
        const class1 = step1 ? "active-step1" : "";
        const class2 = step2 ? "active-step2" : "";
        const class3 = close ? "close" : "";
        const showBullet = bullet ? "new-alarm" : "";

        setClassName({ class: `${showBullet} ${class1} ${class2} ${class3}` });
    }, [step1, step2, bullet]);

    useEffect(() => {
        login.state && refresh();
    },[login]);

    return (
        <>
            <AlarmStyles className={className.class}>
                { (step1 && step2) ?
                    <button className="btn-close" onClick={closeAll}><FontAwesomeIcon icon={faXmark}/></button> :
                    <button className="btn-alarm" onClick={showStep1}><FontAwesomeIcon icon={faBells}/></button> }
                <div className="title-wrapper" onClick={showStep2}>
                    <span className="alarm-title">알림내역</span>
                    <span className="alarm-total">총 <b>{alarm?.data?.length}</b>개</span>
                </div>
                <div className="lists-wrapper">
                    <button className="btn-refresh" onClick={refresh}>새로고침<FontAwesomeIcon icon={faArrowRotateRight} /></button>
                    <div className="outer">
                        <ul className="inner">
                            { alarm?.data?.map((item, i) => <AlarmList key={i} alarm={item} /> ) }
                        </ul>
                    </div>
                </div>
            </AlarmStyles>
        </>
    )
}

export default Alarm

const AlarmList = ({alarm}) => {
    const [ msg, setMsg ] = useState({ icon: "", msg1: "", msg2: "", state: "" }); 

    useEffect(() => {
        if(alarm.ALARM_TYPE === "BTL_REQ_SENT") setMsg({ icon: "fa-sword", msg1: "님께 대결을 신청하셨습니다.", msg2: "", state: "발송" });
        if(alarm.ALARM_TYPE === "BTL_REQ_DENIED") setMsg({ icon: "fa-ban", msg1: "님께서 대결을 ", msg2: "거절", msg3: "하셨습니다.", state: "수신" });
        if(alarm.ALARM_TYPE === "BTL_VICT") setMsg({ icon: "fa-trophy", msg1: "님과의 대결에서 ", msg2: "승리", msg3: "하셨습니다.", state: "수신" });
        if(alarm.ALARM_TYPE === "BTL_DFT") setMsg({ icon: "fa-face-head-bandage", msg1: "님과의 대결에서 ", msg2: "패배", msg3: "하셨습니다.", state: "수신" });
        if(alarm.ALARM_TYPE === "FRD_REQ_SENT") setMsg({ icon: "fa-handshake-simple", msg1: "님께 친구요청을 하셨습니다.", msg2: "", state: "발송" });
        if(alarm.ALARM_TYPE === "FRD_REQ_RECV") setMsg({ icon: "fa-handshake-simple", msg1: "님께서 친구요청을 하셨습니다.", msg2: "", state: "수신" });
        if(alarm.ALARM_TYPE === "FRD_AGR") setMsg({ icon: "fa-person-circle-check", msg1: "님께서 친구요청을 ", msg2: "수락", msg3: "하셨습니다", state: "수신" });
        if(alarm.ALARM_TYPE === "FRD_DSAGR") setMsg({ icon: "fa-ban", msg1: "님께서 친구요청을 ", msg2: "거절", msg3: "하셨습니다.", state: "수신" });
        if(alarm.ALARM_TYPE === "MSG_RECV") setMsg({ icon: "fa-comment-dots", msg1: "님께서 메시지를 보내셨습니다.", msg2: "", state: "수신" });
    }, [alarm]);
    
    return(
        <AlarmListStyles>
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