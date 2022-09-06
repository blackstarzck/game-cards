import { useEffect, useRef, useState } from "react";
import { Background, NoticeStyle, PopupDescr, PopupMain } from "./Popups.elements";
import { gsap } from "gsap"
import { ButtonYes, ButtonNo } from "../Button/Button";
import Database from "../../service/database";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faQuoteLeft, faQuoteRight, faXmark } from '@fortawesome/pro-solid-svg-icons'
import { time } from "../../util/util";

library.add(faQuoteLeft, faQuoteRight, faXmark);

const db = new Database();

export const DescrPopup = ({statName, visible, popup, setPopup, item}) => {
    const el = useRef(null);
    const tl = useRef(null);

    useEffect(() => {
        tl.current = gsap.timeline({ pause: true });
        tl.current.fromTo(el.current, { x: 40, opacity: 0 },{
            x: 45, opacity: 1, duration: .3,
            onStart: function(){
                el.current.style.visibility = "visible"
                el.current.style.zIndex = 3;
            },
            onComplete: function(){
                setTimeout(() => {
                    reverseFunc();
                }, 1800);
            }
        });
    }, []);

    useEffect(() => {
        if(popup){
            tl.current.play();
        }else{
            reverseFunc();
        }
    }, [popup]);

    useEffect(() => {
        if(popup && (visible.target != statName)) reverseFunc();
    },[visible]);

    const reverseFunc = () => {
        tl.current.reverse();
        setTimeout(() => {
            el.current.style.visibility = "hidden";
            el.current.style.zIndex = -1;

        }, 200);
        // console.log(`%cstatName: ${statName}`, "color: goldenrod");
        setPopup(false);
    }

    const descrArray = {
        STR: { name: "Strength", info: "정수기물통을 몇개나 옮길 수 있는지 나타냅니다." },
        AGI: { name: "Agility", info: "대표님과 마주칠 확률에 여향을 줍니다." },
        DEX: { name: "Dexterity", info: "타자속도에 영향을 줍니다." },
        VIT: { name: "Vitaliity", info: "야근력에 영향을 주어 높을수록 야근에 대한 내성이 올라갑니다." },
        INT: { name: "Intelligence", info: "오타를 내는 확률을 줄일 수 있습니다." },
        LUCK: { name: "Luck", info: "동료 또는 상사에게 스타벅스 커피를 얻어먹을 확률에 영향을 줍니다." }
    }

    if(statName){
        return(
            <PopupDescr ref={el}>
                <p><b>{descrArray[statName].name}</b>는(은) {descrArray[statName].info}</p>
            </PopupDescr>
        );
    }

    return(
        <PopupDescr ref={el}>
            <p>{item.CONTENDER_NAME}: {item.CONTENDER_MSG}</p>
            <p>{item.DEFENDER_NAME}: {item.DEFFENDER_MSG}</p>
        </PopupDescr>
    );
}

export const MainPopup = ({
        login,
        type,               // 알람 타입
        mainPopup,              // (useState) 매인팝업의 상태유무
        setMainPopup,           // (useState) 메인팝업 제어
        handleSelectBoxes,  // (useState) 셀렉트박스 제어
        cards,
        setCards,
        battleDetail,
        setBattleDetail,
        ready,
        alarm,
        setAlarm,
        frd,
        setFrd
    }) => {
    const handleClick = async (state) => {
        setMainPopup({ ...mainPopup, state: false }); // 초기화
        let frdObj, myObj;
        const refresh = async () => { // 리프레쉬
            const newData = await db.getSingleData("ALARM_TABLE", login.ID);
            setAlarm({ ...alarm, ...newData });
        }
        if(state === "YES"){
            switch(mainPopup.type){
                case "FRD_REQ_SENT" :
                    frdObj = { alarm_type: "FRD_REQ_RECV", email: mainPopup.data.email, id: mainPopup.data.id, name: mainPopup.data.name, TRG_ID: login.ID, TRG_NAME: login.NAME, TRG_EMAIL: login.EMAIL };
                    myObj = { alarm_type: "FRD_REQ_SENT", email: login.EMAIL, id: login.ID, name: login.NAME, TRG_ID: mainPopup.data.id, TRG_NAME: mainPopup.data.name, TRG_EMAIL: mainPopup.data.email };
                    const write1 = await db.writeNewData("ALARM_TABLE", login.ID, myObj); // 내 알림에 기록
                    const write2 = await db.writeNewData("ALARM_TABLE", frdObj.id, frdObj, refresh); // 친구 알림에 기록
                break;
                case "DELETE_CARD" :
                    const copied = { ...cards };
                    let groupNo, deleNumb, temp, sum = 0;
                
                    copied.CARDS.map((item, i) => {
                        if(item.KEY === mainPopup.data.KEY){ 
                            groupNo = item.GROUP_NO;
                            deleNumb = i;
                        }
                    });
                
                    temp = copied.CARDS[deleNumb];
                    temp = { ...temp, CODE: "", QUOTE: "", DESCR: "", GROUP_NO: 0, GROUP_ORDER: 0, NICK: "", JOB: "", JOB_KR: "", JOB_EN: "", PREF_RANK: 0, REMAIN: 0, LEVEL: 0, STATS: { STR: 0, AGI: 0, DEX: 0, VIT: 0, INT: 0, LUCK: 0 }, POWER: 0 }
                    copied.CARDS.splice(deleNumb, 1);
                    copied.CARDS.push(temp);
                
                    if(groupNo != 0){
                        copied["GROUPS"][`NO${groupNo}`]["MEMBERS"].map((item, i) => {
                            if(item.KEY ===  mainPopup.data.KEY) copied["GROUPS"][`NO${groupNo}`]["MEMBERS"].splice(i, 1); 
                        });
                    }
                    copied["GROUPS"][`NO${groupNo}`]["MEMBERS"]?.map((member) => {
                        sum = sum + member.POWER;
                    });
                
                    const write = await setCards(() => {
                        const updated = { ...cards };
                        updated["CARDS"] = copied.CARDS;
                        if(groupNo != 0){
                            updated["GROUPS"][`NO${groupNo}`]["GROUP_POWER"] = sum;
                            updated["GROUPS"][`NO${groupNo}`]["MEMBERS"] = copied["GROUPS"][`NO${groupNo}`]["MEMBERS"];
                        }
                        db.writeNewData("USER_CARDS", login.ID, updated);
                        return updated;
                    });
                break;
                case "FRD_REQ_RECV" :
                    frdObj = { alarm_type: "FRD_AGR", email: mainPopup.data.email, id: mainPopup.data.id, name: mainPopup.data.name, TRG_ID: login.ID, TRG_NAME: login.NAME, TRG_EMAIL: login.EMAIL };
                    myObj = { ALARM_TYPE: "FRD_AGR", READ_STATE: "Y", RESULT: "N", TIME_STAMP: time(), TRG_ID: mainPopup.data.id, TRG_NAME: mainPopup.data.name, TRG_UID: "", TRG_EMAIL: mainPopup.data.email };
                    setAlarm((alarm) => {
                        const copied = { ...alarm  };
                        for(let i = 0; i < copied.data.length; i++){
                            if(copied.data[i].ALARM_TYPE === mainPopup.type && copied.data[i].TRG_ID === mainPopup.data.id){ // 사용자가 수락 후 다시 클릭할 수 없도록
                                copied.data[i].RESULT = "Y";
                                break;
                            }
                        }
                        copied.data = [ ...copied.data, myObj];
                        db.writeNewDataV2("ALARM_TABLE", login.ID, copied); // 내 알림에 기록
                        return copied
                    });
                    db.writeNewData("ALARM_TABLE", frdObj.id, frdObj); // 친구 알림에 기록

                    // 친구목록에 추가
                    const MSG_KEY = Math.random().toString(36).substring(2, 12);
                    const newFrd = { FRD_ID: mainPopup.data.id, FRD_NAME: mainPopup.data.name, POWER: "", LOGIN: "", FRD_UID: "", RANK: "", FRD_EMAIL: mainPopup.data.email, MSG_KEY };
                    db.writeNewData("USER_FRDS", login.ID, { id: login.ID, name: login.NAME, ...newFrd });
                    db.writeNewData("USER_FRDS", frdObj.id, { id: mainPopup.data.id, name: mainPopup.data.name, FRD_ID: login.ID, FRD_NAME: login.NAME, POWER: "", LOGIN: "", FRD_UID: "", RANK: "", FRD_EMAIL: login.EMAIL, MSG_KEY }, refresh);
                    setFrd({ ...frd, FRDS_INFO: [ ...frd.FRDS_INFO, newFrd ]}); // 친구목록 갱신
                break;
                case "BTL_REQ_SENT" :
                    frdObj = {
                        alarm_type: "BTL_REQ_RECV",
                        id: mainPopup.data.DEFENDER_ID, name: mainPopup.data.DEFENDER_NAME,
                        TRG_ID: login.ID, TRG_NAME: login.NAME,
                        KEY: mainPopup.data.KEY,
                        MSG: mainPopup.data.CONTENDER_MSG,
                        BET_DESCR: mainPopup.data.BET_DESCR
                    };
                    myObj = {
                        alarm_type: "BTL_REQ_SENT",
                        id: login.ID, name: login.NAME,
                        TRG_ID: mainPopup.data.DEFENDER_ID, TRG_NAME: mainPopup.data.DEFENDER_NAME,
                        KEY: mainPopup.data.KEY,
                        MSG: mainPopup.data.CONTENDER_MSG,
                        BET_DESCR: mainPopup.data.BET_DESCR
                    };

                    db.writeNewData("BTL_DT", login.ID, { ...mainPopup.data, email: login.EMAIL, id: login.ID, name: login.NAME });
                    db.writeNewData("ALARM_TABLE", login.ID, myObj);
                    db.writeNewData("ALARM_TABLE", mainPopup.data.DEFENDER_ID, frdObj, refresh);
                break;
                case "BTL_REQ_RECV" :
                    if(!ready.CONTENDER_GROUP_NO){
                        const groupSect = document.querySelector(".group-section").offsetTop;
                        alert("대결준비를 눌러주세요.");
                        window.scrollTo(0, groupSect - 170); 
                        return
                    }
                    const request = await db.getSingleData("BTL_DT", mainPopup.data.id);
                    let newDetail, myResult, frdResult, myAlarmType, frdAlarmType;
                    request || alert(`${mainPopup.data.id}의 대결신청정보가 없습니다.`);
                    request.DETAIL.map((item, i) => {
                        if(item.KEY === mainPopup.data.key){
                            if(item.CONTENDER_GROUP_POWER > ready.CONTENDER_GROUP_POWER){
                                myResult = "LOST";
                                frdResult = "WIN";
                                myAlarmType = "BTL_DFT";
                                frdAlarmType = "BTL_VICT";
                            }
                            if(item.CONTENDER_GROUP_POWER < ready.CONTENDER_GROUP_POWER){
                                myResult = "WIN";
                                frdResult = "LOST";
                                myAlarmType = "BTL_VICT";
                                frdAlarmType = "BTL_DFT";
                            }
                            if(item.CONTENDER_GROUP_POWER === ready.CONTENDER_GROUP_POWER){
                                myResult = "DRAW";
                                frdResult = "DRAW";
                                myAlarmType = "BTL_DRAW";
                                frdAlarmType = "BTL_DRAW";
                            }
                            
                            request.DETAIL[i] = {
                                ...item,
                                DEFENDER_GROUP_NO : ready.CONTENDER_GROUP_NO,
                                DEFENDER_GROUP_POWER : ready.CONTENDER_GROUP_POWER,
                                DEFENDER_GROUP_MEMBERS : ready.CONTENDER_GROUP_MEMBERS,
                                DEFENDER_ID : login.ID,
                                DEFENDER_NAME : login.NAME,
                                DEFFENDER_MSG : inputRef.current.value,
                                RESULT : frdResult,
                                TIME_STAMP : time()
                            }
                            newDetail = request.DETAIL[i];
                        }
                    });
                    db.writeNewData("BTL_DT", login.ID, { ...newDetail, RESULT: myResult, email: login.EMAIL, id: login.ID, name: login.NAME });
                    db.writeNewDataV2("BTL_DT", mainPopup.data.id, request);

                    frdObj = { alarm_type: frdAlarmType, id: mainPopup.data.id, name: mainPopup.data.name, TRG_ID: login.ID, TRG_NAME: login.NAME };
                    myObj = { ALARM_TYPE: myAlarmType, READ_STATE: "Y", RESULT: "N", TIME_STAMP: time(), TRG_ID: mainPopup.data.id, TRG_NAME: mainPopup.data.name };
                    setAlarm((alarm) => {
                        const copied = { ...alarm  };
                        for(let i = 0; i < copied.data.length; i++){
                            if(copied.data[i].ALARM_TYPE === mainPopup.type && copied.data[i].KEY === mainPopup.data.key){ // 사용자가 수락 후 다시 클릭할 수 없도록
                                copied.data[i].RESULT = "Y";
                                break;
                            }
                        }
                        copied.data = [ ...copied.data, myObj];
                        db.writeNewDataV2("ALARM_TABLE", login.ID, copied); // 내 알림에 기록
                        return copied
                    });
                    db.writeNewData("ALARM_TABLE", frdObj.id, frdObj, refresh); // 친구 알림에 기록

                    setBattleDetail((battleDetail) => {
                        const updated = { ...battleDetail };
                        updated.DETAIL = [ ...battleDetail.DETAIL, {...newDetail, RESULT: myResult} ];
                        return updated
                    });
                break;
            }
        }else if(state === "NO"){
            switch(mainPopup.type){
                case "FRD_REQ_RECV" :
                    frdObj = { alarm_type: "FRD_DSAGR", email: mainPopup.data.email, id: mainPopup.data.id, name: mainPopup.data.name, TRG_ID: login.ID, TRG_NAME: login.NAME, TRG_EMAIL: login.EMAIL };
                    myObj = { ALARM_TYPE: "FRD_DSAGR", READ_STATE: "Y", RESULT: "N", TIME_STAMP: time(), TRG_ID: mainPopup.data.id, TRG_NAME: mainPopup.data.name, TRG_UID: "", TRG_EMAIL: mainPopup.data.email };
                    setAlarm((alarm) => {
                        const copied = { ...alarm  };
                        for(let i = 0; i < copied.data.length; i++){
                            if(copied.data[i].ALARM_TYPE === mainPopup.type && copied.data[i].TRG_ID === mainPopup.data.id){ // 사용자가 수락 후 다시 클릭할 수 없도록
                                copied.data[i].RESULT = "Y";
                                break;
                            }
                        }
                        copied.data = [ ...copied.data, myObj];
                        db.writeNewDataV2("ALARM_TABLE", login.ID, copied); // 내 알림에 기록
                        return copied
                    });
                    db.writeNewData("ALARM_TABLE", frdObj.id, frdObj, refresh); // 친구 알림에 기록
                break;
                case "BTL_REQ_RECV" :
                    frdObj = { alarm_type: "BTL_REQ_DENIED", id: mainPopup.data.id, name: mainPopup.data.name, TRG_ID: login.ID, TRG_NAME: login.NAME };
                    myObj = { ALARM_TYPE: "BTL_REQ_DENIED", READ_STATE: "Y", RESULT: "N", TIME_STAMP: time(), TRG_ID: mainPopup.data.id, TRG_NAME: mainPopup.data.name };
                    setAlarm((alarm) => {
                        const copied = { ...alarm  };
                        for(let i = 0; i < copied.data.length; i++){
                            if(copied.data[i].ALARM_TYPE === mainPopup.type && copied.data[i].KEY === mainPopup.data.key){ // 사용자가 수락 후 다시 클릭할 수 없도록
                                copied.data[i].RESULT = "Y";
                                break;
                            }
                        }
                        copied.data = [ ...copied.data, myObj];
                        db.writeNewDataV2("ALARM_TABLE", login.ID, copied); // 내 알림에 기록
                        return copied
                    });
                    db.writeNewData("ALARM_TABLE", frdObj.id, frdObj, refresh); // 친구 알림에 기록
                break;
            }
        }
        
        setTimeout(() => {
            handleSelectBoxes({name: "FRD", state: false});
            setMainPopup({ state: false, type: "", data: "" }); // 초기화
            if(mainPopup.type === "BTL_REQ_RECV") setVisible(false);
        }, 400);
    }

    const mainMsgRef = useRef(null);
    const subMsg1gRef = useRef(null);
    const subMsg2gRef = useRef(null);
    const el = useRef(null);
    const tl = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        tl.current = gsap.timeline({ pause: true });
        tl.current.fromTo(el.current, { y: -5, opacity: 0 },{
            y: 0, opacity: 1, duration: .4,
            onStart: function(){
                el.current.style.visibility = "visible"
                el.current.style.zIndex = 10;
            }
        });
    }, []);

    useEffect(() => { // 팝업 오픈시 스크롤바 제어
        mainPopup.state ? tl.current.play() : reverseFun();
        if(mainPopup.state) document.body.style.overflow = "hidden";
        if(!mainPopup.state) document.body.style.overflow = "";

        let mainMsg = "", subMsg1 = "", subMsg2 = "";

        switch(mainPopup.type){
            case "DELETE_CARD" :
                mainMsg = `<h4 ><b>${mainPopup.data.NICK}님</b>를(을) 삭제하시겠습니까?</h4>`;
            break;
            case "FRD_REQ_SENT" :
                mainMsg = `<h4 ><b>${mainPopup.data.id}님</b>에게<br/>친구신청하시겠습니까?</h4>`;
            break;
            case "FRD_REQ_RECV" :
                mainMsg = `<h4 ><b>${mainPopup.data.id}(${mainPopup.data.name})님</b>의 친구요청을</br>수락하시겠습니까?</h4>`;
            break;
            case "BTL_REQ_SENT" :
                subMsg1 = `<b>${mainPopup.data.DEFENDER_NAME}님</b>께</br><b class="bold" style="text-decoration: underline">${mainPopup.data.BET_DESCR}</b>를 요청하시겠습니까?`;
                mainMsg = `<span class="msg" style="display: block;margin: 15px 0">${mainPopup.data.CONTENDER_MSG || "발송메시지 X"}</span>`;
            break;
            case "BTL_REQ_RECV" :
                subMsg1 = `<b>${mainPopup.data.id}</b>께서</br><b class="bold" style="text-decoration: underline">${mainPopup.data.bet}</b>를 요청하셨습니다.`;
                mainMsg = mainPopup.data.msg ? `<span class="msg">${mainPopup.data.msg}</span>` : "";
                subMsg2 = `수락하시겠습니까?`;
            break;
        }

        mainMsgRef.current.innerHTML = mainMsg;
        subMsg1gRef.current.innerHTML = subMsg1;
        subMsg2gRef.current.innerHTML = subMsg2;

    },[mainPopup.state]);

    const reverseFun = () => {
        tl.current.reverse();
        setTimeout(() => {
            el.current.style.visibility = "hidden";
            el.current.style.zIndex = -1;
        }, 400);
    }

    const [ visible, setVisible ] = useState(false);
    const handleMouseEnter = () => setVisible(true);
    const closeMainPopup = () => {
        reverseFun();
        setTimeout(() => {
            setMainPopup({ state: false, type: "", data: "" }); // 초기화
            setVisible(false);
        }, 400);
    }

    return(
        <>
            <DimmbedBg popup={mainPopup.state}/>
            <PopupMain
                ref={el}
                visible={visible}
                type={mainPopup.type} >
                <button onClick={closeMainPopup} className="btn-close"><FontAwesomeIcon icon="fa-solid fa-xmark" /></button>
                <div  className="msg-area">
                    <div ref={subMsg1gRef} className="sub-msg"></div>
                    { (mainPopup.data.msg && (mainPopup.type === "BTL_REQ_SENT" || mainPopup.type === "BTL_REQ_RECV")) && <div className="quotes-up"><FontAwesomeIcon icon="fa-solid fa-quote-left" /></div> }
                    <div ref={mainMsgRef} className="main-msg"></div>
                    { (mainPopup.data.msg && (mainPopup.type === "BTL_REQ_SENT" || mainPopup.type === "BTL_REQ_RECV")) && <div className="quotes-dwn"><FontAwesomeIcon icon="fa-solid fa-quote-right" /></div> }
                    <div ref={subMsg2gRef} className="sub-msg"></div>

                    { mainPopup.type === "BTL_REQ_RECV" && 
                        <div className="input-wrapper"><input ref={inputRef} type="text" placeholder={`${mainPopup.data.id}님꼐 메시지를 보내보세요`}></input></div> }
                </div>
                <div className="btn-wrapper">
                    <ButtonYes
                        handleMouseEnter={handleMouseEnter}
                        handleClick={() => handleClick("YES")} />
                    <ButtonNo
                        handleClick={() => handleClick("NO")} />
                </div>
            </PopupMain>
        </>
    );
}

export const DimmbedBg = ({popup}) => <Background active={popup} className={`dimmed-bg`}></Background>;

export const Notice = ({type, notice, setNotice, mainCard}) => {
    const init = 4;
    const [ count, setCount ] = useState(init);
    const noticeRef = useRef();
    const boxRef = useRef();

    const handleClose = () => {
        setCount(init);
        setNotice(false);
    }
    
    useEffect(() => {
        const countDown = notice && setTimeout(() => {
            setCount(init + 1);
            setNotice(false);
        }, init * 1000);

        const timer = notice && setInterval(() => {
            setCount(value => {
                if(value === 0){
                    clearInterval(timer);
                }else{
                    return value - 1;
                }
            });
        }, 1000);
        return () => {
            clearInterval(timer);
            clearTimeout(countDown)
        }
    }, [notice]);

    if(type === "saved"){
        return(
            <NoticeStyle ref={noticeRef} notice={notice} onClick={handleClose}>
                <div className="inner-box">
                    <span className="main-text">능력치를 저장했습니다.</span>
                    <span className="timer">{count}</span>
                </div>
            </NoticeStyle>
        );
    }

    return(
        <NoticeStyle ref={noticeRef} notice={notice} onClick={handleClose}>
            <div className="inner-box">
                <span className="main-text">
                    <b className="strong">{mainCard.NICK}</b>를(을) <br /> 보관하였습니다.</span>
                <span className="timer">{count}</span>
            </div>
        </NoticeStyle>
    );
}