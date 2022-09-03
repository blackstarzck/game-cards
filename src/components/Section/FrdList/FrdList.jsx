import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserGroup, faSquarePollVertical, faArrowRotateRight, faSquareArrowDown, faSword, faMessages } from '@fortawesome/pro-light-svg-icons'
import { faChevronDown, faCircleXmark  } from '@fortawesome/pro-solid-svg-icons'
import React, { memo, useRef, useState } from 'react'
import { ChatBoxStyles, FrdListSection, FrdListStyles, MessageBoxStyles, RowStyles, SelectBoxStyles, StaticRowStyles, StatisticsStyles } from './FrdList.elements'
import { useEffect } from 'react'
import Database from '../../../service/database'
import { gsap } from "gsap"
import { loadFaceDetectionModel } from 'face-api.js'
import { setInitDatas } from '../../../data/data'

const db = new Database();

const SectionFrdList = ({login, frd, setFrd, requestBattle, ready, battleDetail, setBattleDetail}) => {
    return (
        <FrdListSection>
            <FrdList
                login={login}
                ready={ready}
                requestBattle={requestBattle}
                frd={frd}
                setFrd={setFrd} />
            <Statistics
                login={login}
                frd={frd}
                battleDetail={battleDetail}
                setBattleDetail={setBattleDetail} />
        </FrdListSection>
    )
}

export default SectionFrdList

const FrdList = memo(({login, frd, setFrd, requestBattle, ready}) => {
    const [ pos, setPos ] = useState({ vis: false, x: 0, y: 0, width: 0 });
    const [ selectItems, setSelectItems ] = useState({ type: "", item: [] });
    const [ chatBox, setChatBox ] = useState(false);
    const [ myBattleState, setMyBattleState ] = useState({ CONTENDER_MSG: "" }); 
    const [ msgSetting, setMsgSetting ] = useState({ msgKey: "", friend: "" });
    const [ msgLog, setMsgLog ] = useState([]);
    const cmmtRef = useRef(null);

    const handleSelectBox = (elem, type) => {
        const width = (type === "bet") ? 172 : 95;

        if(pos.vis){
            setPos({ vis: false, x: 0, y: 0, width });
        }else{
            const { offsetTop, offsetLeft, offsetWidth, offsetHeight } = elem;
            const x = offsetLeft - ((width - offsetWidth) / 2);
            const y = (offsetTop + offsetHeight) + 5;

            setPos({ vis: true, x, y, width });
        }
        setSelectItems(() => {
            let data;
            let temp = [];
            if(type === "bet") data = ([ "커피내기", "심부름 내기", "저녁내기" ]);

            if(type === "friend"){
                frd.FRDS_INFO.map((item) => temp.push(item.FRD_NAME));
                data = temp;
            }
            const updated = { type, item: data }
            return updated
        });
    }

    const handleChage = () => {
        let msg = cmmtRef.current.value;
        setMyBattleState({ CONTENDER_MSG: msg });
    }

    const onlineCheck = () => {
        if(!login.ID) return;
        console.log("작동?")
        const copied = { ...frd };
        copied?.FRDS_INFO?.map((item) => {
            db.frdOnlineCheck(item.FRD_ID, status => {
                if(status === true) item.LOGIN = true;
                if(status === false) item.LOGIN = false;
                setFrd({ ...frd, ...copied });
            });
        });
        
    }

    useEffect(() => {
        console.log("frd: ", frd);
        const copied = { ...frd };
        copied?.FRDS_INFO?.map((item) => {
            db.frdOnlineCheck(item.FRD_ID, status => {
                console.log("??");
                if(status === true) item.LOGIN = true;
                if(status === false) item.LOGIN = false;
                setFrd({ ...frd, ...copied });
            });
        });
    }, [login]);


    return(
        <FrdListStyles>
            <MessageBox
                login={login}
                msgLog={msgLog}
                setMsgLog={setMsgLog}
                chatBox={chatBox}
                setChatBox={setChatBox}
                msgSetting={msgSetting}
                setMsgSetting={setMsgSetting} />
            <div className="top">
                <h3 className="title"><FontAwesomeIcon icon={faUserGroup} />친구목록</h3>
                <div className="input-wrapper">
                    <div className="heading">코멘트 발송</div>
                    <input ref={cmmtRef}  onChange={handleChage} type="text" placeholder="친구에게 메시지를 보내보세요."/>
                    <button className="btn-txt-clear"><FontAwesomeIcon icon={faCircleXmark} /></button>
                </div>
            </div>

            <div className="body">
                <ul className="thead">
                    <li className="th">접속상태</li>
                    <li className="th btn-frd" onClick={(e) => handleSelectBox(e.target, "friend")}>친구</li>
                    {/* <li className="th">순위<FontAwesomeIcon icon={faSquareArrowDown} /></li>
                    <li className="th">전투력<FontAwesomeIcon icon={faSquareArrowDown} /></li> */}
                    <li className="th">대결내용</li>
                    <li className="th"><button className="btn-refresh" onClick={onlineCheck}><FontAwesomeIcon icon={faArrowRotateRight} /></button></li>
                </ul>
                <div className="outer">
                    <div className="tbody">
                        {(login.state && frd?.FRDS_INFO?.length > 0) ? frd?.FRDS_INFO?.map((friend, i) => 
                            <FrdRow 
                                login={login}
                                key={i}
                                requestBattle={requestBattle}
                                myBattleState={myBattleState}
                                setMsgSetting={setMsgSetting}
                                chatBox={chatBox}
                                setChatBox={setChatBox}
                                ready={ready}
                                friend={friend}
                                online={friend.LOGIN ? true : false} 
                                receive={true} /> ) :
                            <span className="standby">친구를 등록하고 친구와 내기를 해보세요!</span>
                        }
                    </div>
                </div>
                {/* <SelectBox
                    login={login}
                    pos={pos}
                    setPos={setPos}
                    selectItems={selectItems}
                    handleSelectBox={handleSelectBox} /> */}
            </div>
        </FrdListStyles>
    );
});

const ChatBox = memo(({friend, setMsgSetting, visiblie, chatBox, setChatBox}) => {
    const handleClick = () => {
        setChatBox(!chatBox);
        setMsgSetting({ key: friend.MSG_KEY, frined: friend.FRD_NAME });
    }
    return(
        <ChatBoxStyles onClick={() => handleClick()} visiblie={visiblie}>채팅하기<FontAwesomeIcon icon={faMessages}/></ChatBoxStyles>
    );
});

const SelectBox = memo(({login, pos, setPos, selectItems}) => {
    const handleClick = (e) => setPos({ vis: false, x: 0, y: 0 });

    return(
        <SelectBoxStyles pos={pos} height={selectItems.item.length * 30 + 22}>
            { selectItems.item.map((item, i) => <li key={i} onClick={(e) => login.state && handleClick(e)} className="item">{item}</li>) }
        </SelectBoxStyles>
    );
});

const FrdRow = memo(({login, friend, online, receive,chatBox, setChatBox, myBattleState, requestBattle, ready, setMsgSetting}) => {
    const [ visiblie, setVisible ] = useState(false);
    const [ request, setRequest ] = useState({ BET_DESCR: "커피내기", DEFENDER_ID: friend.FRD_ID, DEFENDER_NAME: friend.FRD_NAME });
    const selectRef = useRef(null);

    const handleChatbox = (e) => setVisible(!visiblie);
    const handleChange = () => setRequest({ ...request, BET_DESCR: selectRef.current.value });
    const handleClick = () => {
        if(!ready.CONTENDER_GROUP_NO){
            const groupSect = document.querySelector(".group-section").offsetTop;
            alert("대결준비를 눌러주세요.");
            window.scrollTo(0, groupSect - 170); 
            return
        }
        requestBattle({ ...myBattleState, ...request });
    }

    // useEffect(() => {
    //     console.log("friend: ", friend.FRD_ID);
    //     const sync = db.messageCheck(friend.FRD_ID, message => {

    //     });
    //     return () => sync();
    // }, [frd]);
    
    return(
        <RowStyles online={online} receive={receive} >
            <li className="td"><div className="onOff"></div></li>
            <li className="td frd-name" onClick={handleChatbox}>
                {friend.FRD_NAME}
                { online &&
                    <ChatBox
                        friend={friend}
                        setMsgSetting={setMsgSetting}
                        visiblie={visiblie}
                        chatBox={chatBox}
                        setChatBox={setChatBox} /> }
            </li>
            {/* <li className="td numb">{friend.RANK || "-"}</li>
            <li className="td numb">{friend.POWER || "-"}</li> */}
            <li className="td">
                <div className="selectBox">
                    <select ref={selectRef} disabled={(login.state && friend.LOGIN) ? false : true} onChange={handleChange} name="bet" id="">
                        <option value="커피내기">커피내기</option>
                        <option value="심부름 내기">심부름 내기</option>
                        <option value="저녁내기">저녁내기</option>
                    </select>
                    <div className="icon"><FontAwesomeIcon icon={faChevronDown} /></div>                    
                    {/* <div onClick={(e) => setSelectBox(e)} className="selected-item">점심내기</div> */}
                </div>
            </li>
            <li className="td"><button onClick={() => (login.state && friend.LOGIN) && handleClick()} className="btn-req"><FontAwesomeIcon icon={faSword} /></button></li>
        </RowStyles>
    );
});

const MessageBox = memo(({login, chatBox, setChatBox, msgSetting, setMsgSetting, msgLog, setMsgLog}) => {
    const el = useRef(null);
    const tl = useRef(null);
    const message = useRef(null);

    useEffect(() => {
        tl.current = gsap.timeline({ pause: true });
        tl.current.fromTo(el.current, { y: -3, opacity: 0 },{
            y: 0, opacity: 1, duration: .1,
            onStart: function(){
                el.current.style.visibility = "visible"
            }
        });
    }, []);

    useEffect(() => {
        chatBox ? tl.current.play() : reverseFun();
    },[chatBox]);

    const reverseFun = () => {
        message.current.value = "";
        setMsgSetting({ key: "", friend: "", msgLog: [] }); // 초기화
        tl.current.reverse();
        setTimeout(() => {
            el.current.style.visibility = "hidden";
        }, 400)
    }

    const sendMessage = (e) => {
        const data = {
            key: msgSetting.key,
            id: login.ID,
            msg: message.current.value
        }
        db.messageSend(data);
    }

    useEffect(() => {
        console.log("msgSetting: ", msgSetting);
        setMsgLog(msgLog = []);
        const tempArray = [];
        const sync = msgSetting.key && db.messageLogInit(msgSetting.key, log => {
            log.forEach((msg) => {
                tempArray.push(msg.val());
            });
        });
        console.log(1);
        setMsgLog(msgLog = tempArray);
    }, [msgSetting]);

    useEffect(() => {
        setMsgLog(msgLog = []);
        msgSetting.key && db.messageAddCheck(msgSetting.key, (msgAdded) => {
            setMsgLog(msgLog = [ ...msgLog, msgAdded ]);
        });
    }, [msgSetting]);
    

    return(
        <MessageBoxStyles ref={el}>
            <div className="top">
                <div className="title">{msgSetting.frined} <FontAwesomeIcon icon={faMessages} /></div>
                <button className="btn-claose" onClick={() => setChatBox(!chatBox)} ><FontAwesomeIcon icon="fa-light fa-circle-xmark" /></button>
            </div>
            <div className="body">
                <ul className="inner">
                    { msgLog.map(((item, i) => <li key={i} className={`msg-item ${ (item.sender === login.ID) ? "myMsg" : "yourMsg"}`}>
                        <p className="text-area">{item.msg}</p>
                        <span className="time">{item.time?.split(" ")[0]}<br/>{item.time?.split(" ")[1]}</span>
                    </li> )) }
                </ul>
            </div>
            <div className="bottom">
                <input ref={message} onKeyPress={(e) => (e.key === "Enter" && e.target.value) && sendMessage(e)} type="text" placeholder="메시지를 입력해주세요." />
                <button onClick={() => sendMessage()} className="btn-submit">입력</button>
            </div>
        </MessageBoxStyles>
    );
});

const Statistics = memo(({login, frd, battleDetail, setBattleDetail}) => {
    const [ pos, setPos ] = useState({ vis: false, x: 0, y: 0, width: 0 });
    const [ selectItems, setSelectItems ] = useState({ type: "", item: [] });
    const [ statics, setStatics ] = useState(battleDetail);
    const [ result, setResult ] = useState({ victory: 0, defeat: 0 });

    const handleSelectBox = (elem, type) => {
        const width = (type === "bet") ? 172 : 95;

        if(pos.vis){
            setPos({ vis: false, x: 0, y: 0, width });
        }else{
            const { offsetTop, offsetLeft, offsetWidth, offsetHeight } = elem;
            const x = offsetLeft - ((width - offsetWidth) / 2);
            const y = (offsetTop + offsetHeight) + 5;

            setPos({ vis: true, x, y, width });
        }
        setSelectItems(() => {
            let data;
            let temp = [];
            if(type === "bet") data = ([ "커피내기", "심부름 내기", "저녁내기" ]);

            if(type === "friend"){
                frd.FRDS_INFO.map((item) => temp.push(item.FRD_NAME));
                data = temp;
            }
            const updated = { type, item: data }
            return updated
        });
    }

    useEffect(() => {
        const init = () => {
            const copied = { ...battleDetail };
            
            setResult({ victory: 0, defeat: 0 });

            copied?.DETAIL.map((item) => {
                if(item.RESULT === "WIN"){
                    item.RESULT_CLASS = "result-victory";
                    item.RESULT_NAME = "승리";
                    setResult((result) => {
                        const updated = { ...result };
                        updated.victory = updated.victory + 1;
                        return updated
                    });
                }
                if(item.RESULT === "LOST"){
                    item.RESULT_CLASS ="result-defeat";
                    item.RESULT_NAME = "패배";
                    setResult((result) => {
                        const updated = { ...result };
                        updated.defeat = updated.defeat + 1;
                        return updated
                    });
                }
                if(item.RESULT === "DRAW"){
                    item.RESULT_CLASS ="result-draw";
                    item.RESULT_NAME = "무승부";
                }
            });
            console.log("copied: ", copied);
            setStatics({ ...copied });
        }
        login.state && init();
    }, [login, battleDetail]);

    return(
        <StatisticsStyles>
            <div className="top">
                <h3 className="title"><FontAwesomeIcon icon={faSquarePollVertical} />전적집계</h3>
                <div className="result-wrap">
                    <span className="victory">승리 <b className="numb">{result.victory}</b></span>
                    <span className="defeat">패배 <b className="numb">{result.defeat}</b></span>
                </div>
            </div>

            <div className="body">
                <div className="thead">
                    <ul className="thead">
                        <li className="th">날짜</li>
                        <li className="th" onClick={(e) => handleSelectBox(e.target, "friend")}>대결상대</li>
                        <li className="th">결과</li>
                        <li className="th">대결내용</li>
                    </ul>
                </div>
                <div className="outer">
                    <div className="tbody">
                        { login.state && statics.DETAIL.map((item, i) => item.RESULT && <StaticRow login={login} key={i} item={item} /> ) }
                        
                    </div>
                </div>
                {/* <SelectBox
                    login={login}
                    pos={pos}
                    setPos={setPos}
                    selectItems={selectItems}
                    handleSelectBox={handleSelectBox} /> */}
            </div>
        </StatisticsStyles>
    );
});

const StaticRow = memo(({login, item}) => {
    const handleClick = () => {

    }
    
    return(
        <StaticRowStyles>
            <li className="td date">{item.TIME_STAMP.split(" ")[0].replace(/\./g, "-")}</li>
            <li className="td" onClick={handleClick}>
                { (item.CONTENDER_NAME !== login.NAME) && item.CONTENDER_NAME }
                { (item.DEFENDER_NAME !== login.NAME) && item.DEFENDER_NAME }
            </li>
            <li className={`td ${item.RESULT_CLASS}`}>{item.RESULT_NAME}</li>
            <li className="td">{item.BET_DESCR}</li>
        </StaticRowStyles>
    );
});