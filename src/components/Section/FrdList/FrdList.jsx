import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserGroup, faSquarePollVertical, faArrowRotateRight, faSquareArrowDown, faSword, faMessages } from '@fortawesome/pro-light-svg-icons'
import { faCircleXmark  } from '@fortawesome/pro-solid-svg-icons'
import React, { useRef, useState } from 'react'
import { ChatBoxStyles, FrdListSection, FrdListStyles, MessageBoxStyles, RowStyles, SelectBoxStyles, StaticRowStyles, StatisticsStyles } from './FrdList.elements'
import { useEffect } from 'react'
import Database from '../../../service/database'
import { gsap } from "gsap"
import { setInitDatas } from '../../../data/data'

const db = new Database();


const SectionFrdList = ({login, frd}) => {
    return (
        <FrdListSection>
            <FrdList login={login} frd={frd} />
            <Statistics login={login} frd={frd} />
        </FrdListSection>
    )
}

export default SectionFrdList

const FrdList = ({login, frd}) => {
    const [ pos, setPos ] = useState({ vis: false, x: 0, y: 0, width: 0 });
    const [ selectItems, setSelectItems ] = useState([]);
    const [ chatBox, setChatBox ] = useState(false);

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
                frd.map((item) => temp.push(item.FRD_NAME));
                data = temp;
            }
            return data
        });
    }

    return(
        <FrdListStyles>
            <MessageBox chatBox={chatBox} setChatBox={setChatBox} />
            <div className="top">
                <h3 className="title"><FontAwesomeIcon icon={faUserGroup} />친구목록</h3>
                <div className="input-wrapper">
                    <div className="heading">코멘트 발송</div>
                    <input type="text" placeholder=""/>
                    <button className="btn-txt-clear"><FontAwesomeIcon icon={faCircleXmark} /></button>
                </div>
            </div>

            <div className="body">
                <ul className="thead">
                    <li className="th">접속상태<FontAwesomeIcon icon={faSquareArrowDown} /></li>
                    <li className="th btn-frd" onClick={(e) => handleSelectBox(e.target, "friend")}>친구</li>
                    <li className="th">순위<FontAwesomeIcon icon={faSquareArrowDown} /></li>
                    <li className="th">전투력<FontAwesomeIcon icon={faSquareArrowDown} /></li>
                    <li className="th">대결내용<FontAwesomeIcon icon={faSquareArrowDown} /></li>
                    <li className="th"><FontAwesomeIcon icon={faArrowRotateRight} /></li>
                </ul>
                <div className="outer">
                    <div className="tbody">
                        {(login.state && frd?.FRDS_INFO?.length > 0) ? frd?.FRDS_INFO?.map((friend) => 
                            <FrdRow 
                                key={friend.KEY}
                                chatBox={chatBox}
                                setChatBox={setChatBox}
                                friend={friend}
                                online={friend.LOGIN === "Y" ? true : false} 
                                handleSelectBox={handleSelectBox} 
                                receive={true} /> ) :
                            <span className="standby">친구를 등록하고 친구와 내기를 해보세요!</span>
                        }
                    </div>
                </div>
                <SelectBox
                    login={login}
                    pos={pos}
                    setPos={setPos}
                    selectItems={selectItems}
                    handleSelectBox={handleSelectBox} />
            </div>
        </FrdListStyles>
    );
}

const ChatBox = ({visiblie, chatBox, setChatBox}) => {
    return(
        <ChatBoxStyles onClick={() => setChatBox(!chatBox)} visiblie={visiblie}>채팅하기<FontAwesomeIcon icon={faMessages}/></ChatBoxStyles>
    );
}

const SelectBox = ({login, pos, setPos, selectItems}) => {
    const handleClick = (e) => {
        setPos({ vis: false, x: 0, y: 0 })
        console.log("text: ", e.target.innerHTML);
    }
    return(
        <SelectBoxStyles pos={pos} height={selectItems?.length * 30 + 22}>
            { selectItems.map((item, i) => <li key={i} onClick={(e) => login.state && handleClick(e)} className="item">{item}</li>) }
        </SelectBoxStyles>
    );
}

const FrdRow = ({friend, online, receive, handleSelectBox, chatBox, setChatBox}) => {
    const [ visiblie, setVisible ] = useState(false);
    const [ myState, setMyState ] = useState(); // 대길신청을 위한
    
    const handleChatbox = (e) => setVisible(!visiblie);

    const setSelectBox = (e) => {
        handleSelectBox(e.target, "bet");
    }
    
    return(
        <RowStyles online={online} receive={receive} >
            <li className="td"><div className="onOff"></div></li>
            <li className="td frd-name" onClick={handleChatbox}>{friend.FRD_NAME}{ online && <ChatBox visiblie={visiblie} chatBox={chatBox} setChatBox={setChatBox} /> }</li>
            <li className="td numb">{friend.RANK || "-"}</li>
            <li className="td numb">{friend.POWER || "-"}</li>
            <li className="td">
                <div className="selectBox">
                    <div onClick={(e) => setSelectBox(e)} className="selected-item">점심내기</div>
                </div>
            </li>
            <li className="td"><button className="btn-req"><FontAwesomeIcon icon={faSword} /></button></li>
        </RowStyles>
    );
}

const MessageBox = ({chatBox, setChatBox}) => {
    const el = useRef(null);
    const tl = useRef(null);

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
        tl.current.reverse();
        setTimeout(() => {
            el.current.style.visibility = "hidden";
        }, 400)
    }

    return(
        <MessageBoxStyles ref={el}>
            <div className="top">
                <div className="title">채팅하기 <FontAwesomeIcon icon={faMessages} /></div>
                <button className="btn-claose" onClick={() => setChatBox(!chatBox)} ><FontAwesomeIcon icon="fa-light fa-circle-xmark" /></button>
            </div>
            <div className="body">
                <ul className="inner">
                    <li className="msg-item myMsg">
                        <p className="text-area">안녕하세요.</p>
                        <span className="time">2022.07.22<br/>09:10:45</span>
                    </li>
                    <li className="msg-item yourMsg">
                        <p className="text-area">안녕하세요.</p>
                        <span className="time">2022.07.22<br/>09:10:45</span>
                    </li>
                    <li className="msg-item yourMsg">
                        <p className="text-area">안녕하세요.</p>
                        <span className="time">2022.07.22<br/>09:10:45</span>
                    </li>
                    <li className="msg-item yourMsg">
                        <p className="text-area">안녕하세요.</p>
                        <span className="time">2022.07.22<br/>09:10:45</span>
                    </li>
                    <li className="msg-item yourMsg">
                        <p className="text-area">안녕하세요.</p>
                        <span className="time">2022.07.22<br/>09:10:45</span>
                    </li>
                </ul>
            </div>
            <div className="bottom">
                <input type="text" placeholder="메시지를 입력해주세요." />
                <button className="btn-submit">입력</button>
            </div>
        </MessageBoxStyles>
    );
}

const Statistics = ({login, frd}) => {
    const [ pos, setPos ] = useState({ vis: false, x: 0, y: 0, width: 0 });
    const [ selectItems, setSelectItems ] = useState([]);

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
                frd.map((item) => temp.push(item.FRD_NAME));
                data = temp;
            }
            return data
        });
    }

    return(
        <StatisticsStyles>
            <div className="top">
                <h3 className="title"><FontAwesomeIcon icon={faSquarePollVertical} />전적집계</h3>
                <div className="result-wrap">
                    <span className="victory">승리 <b className="numb">2</b></span>
                    <span className="defeat">패배 <b className="numb">2</b></span>
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
                        <StaticRow />
                    </div>
                </div>
                <SelectBox
                    login={login}
                    pos={pos}
                    setPos={setPos}
                    selectItems={selectItems}
                    handleSelectBox={handleSelectBox} />
            </div>
        </StatisticsStyles>
    );
}

const StaticRow = () => {
    return(
        <StaticRowStyles>
            <li className="td date">2022-07-18</li>
            <li className="td">박푸름</li>
            <li className="td result-victory">승리</li>
            <li className="td">커피내기</li>
        </StaticRowStyles>
    );
}