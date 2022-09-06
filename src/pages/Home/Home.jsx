import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from "styled-components"
import { ButtonScrollUp } from '../../components/Button/Button';
import Alarm from '../../components/cointainer/Alarm/Alarm';
import { MainPopup } from '../../components/Popups/Popups';
import SectionFrdList from '../../components/Section/FrdList/FrdList';
import SectionFrdSearch from '../../components/Section/FrdSearch/FrdSearch';
import SectionGroup from '../../components/Section/Group/Group';
import SectionMain from '../../components/Section/Main/Section';
import SectionStorage from '../../components/Section/Storage/Storage';
import { setInitDatas } from '../../data/data';
import Database from '../../service/database';
import { randomLevelStat, setCookie, time } from '../../util/util';

const db = new Database();

const Home = ({login, frd, setFrd, cards, setCards, alarm, setAlarm}) => {
  const [ mainCard, setMainCard ] = useState(setInitDatas("MAIN_CARD"));
  const [ battleDetail, setBattleDetail ] = useState(setInitDatas("BTL_DT"));
  const [ ready, setReady ] = useState(setInitDatas("BTL_DT", "DETAIL"));

  const [ selectBoxes, setSelectBox ] = useState({ FRD : { show: false } });
  const [ mainPopup, setMainPopup ] = useState({ // 매인팝업의 상태유무
    state: false, type: "", data: ""
  });
  const [ newCard, setNewCard ] = useState("NEW");
  // const mainPopup = useRef(false);
          
  const selectNewOrPrev = (select) => setNewCard(select);

  const navigate = useNavigate();

  const handlePopup = (evt) => {
    if(login){
      const targetEle = evt.target.className;
      const targetTag = evt.target.tagName;
      
      if(mainPopup.state === false &&
        (selectBoxes["FRD"].show &&
        (targetEle != "frd-id" &&
        targetEle != "dimmed-bg" &&
        targetTag != "INPUT" && 
        targetTag != "BUTTON" && 
        targetTag != "path" && 
        targetTag != "svg")))
      {
        handleSelectBoxes({ name: "FRD", state: false });
      }
    }
  }

  const handleSelectBoxes = (popup) => {
    setSelectBox((selectBoxes) => {
      const updated = { ...selectBoxes };
      updated[popup.name].show = popup.state;
      return updated;
    })
  }

  const keepSelectedCard = async (result) => {
    const POWER = mainCard.STATS.STR + mainCard.STATS.AGI + mainCard.STATS.DEX + mainCard.STATS.VIT + mainCard.STATS.INT + mainCard.STATS.LUCK;
    let cnt = 0;

    if(login.state){
      cards.CARDS.map((card) => { if(card.CODE) cnt++; });
      if(cards.DAILY_CNT === 0){
        alert("오늘은 더이상 이미지를 업로드할 수 없습니다.");
        return;
      }

      if(cnt < 8){
        setCards((cards) => {
          const updated = { ...cards };
          updated["DAILY_CNT"] = updated.DAILY_CNT - 1;

          for(let i = 0; i < updated.CARDS.length; i++){
            if(updated.CARDS[i].CODE === ""){
              updated.CARDS[i] = { ...updated.CARDS[i], ...result, POWER }
              break;
            }
          }
          db.writeNewData("USER_CARDS", login.ID, updated);
          return updated
        });

        setCookie("PREV_INFO", "", -1);
        return true
      }else{
        alert("카드는 최대 8개까지만 보유할 수 있습니다.");
        return null;
      }
    }else{
      const str = JSON.stringify(result).replace(/[\{\}\[\]\;|\~`\"]/g, "").replace("STATS:", "").replace(/https:/g, "");
      setCookie("PREV_INFO", str, 1);
      alert("로그인 후 보관하실 수 있습니다.\n로그인 페이지로 이동합니다.");
      navigate("/login", { replace: true });
    }
  }

  const upgradeCard = (card) => {
    const copied = { ...card }

    if(copied.KEY && copied.DAILY_CNT != 0){
      const income = 5;
      const limit = 10 + (copied.LEVEL * 2);
      let EXP_PER = Math.round(((copied.EXP + income) / limit) * 100);
      let EXP = copied.EXP + income;
      let RESULT, LEVEL, REMAIN;
      
      if(EXP > limit){
        LEVEL = copied.LEVEL + 1;
        REMAIN = copied.REMAIN + randomLevelStat();
        EXP_PER = Math.round(((EXP - limit) / limit) * 100);
        RESULT = { ...copied, EXP: (EXP - limit), EXP_PER, LEVEL, REMAIN };

        upgradeCard(RESULT);
        setMainCard(RESULT);
        // console.log(`1 LEVEL: ${RESULT.LEVEL}, EXP: ${RESULT.EXP} (${ Math.round((RESULT.EXP / limit) * 100)}%) LIMIT: ${limit} REMAIN: ${REMAIN}`);
      }else{
        RESULT = { ...copied, EXP, EXP_PER };

        setMainCard(RESULT);
        // console.log(`2 LEVEL: ${RESULT.LEVEL}, EXP: ${RESULT.EXP} (${ Math.round((RESULT.EXP / limit) * 100)}%) LIMIT: ${limit} REMAIN: ${RESULT.REMAIN}`);
      }

      setCards((cards) => {
        const updated = { ...cards };
        updated["DAILY_CNT"] = updated.DAILY_CNT - 1;

        for(let i = 0; i < updated.CARDS.length; i++){
          if(updated.CARDS[i].KEY === RESULT.KEY){
            updated.CARDS[i] = RESULT;
            break;
          }
        }
        db.writeNewData("USER_CARDS", login.ID, updated);
        return updated
      });
    }
  }

  const removeCardFromGroup = (key, groupNo) => {
    setCards((cards) => {
      const updated = { ...cards };
      const members = updated["GROUPS"][`${groupNo}`]["MEMBERS"];
      let sum = 0;

      updated["CARDS"].map((card) => {
        if(card["KEY"] === key){
          card["GROUP_NO"] = 0;
          console.log(`${key}를 ${groupNo}에서 제외시킵니다.`);
        }
      });
      members.map((member, i) => {
        if(member["KEY"] === key) members.splice(i, 1);
      });
      members.map((member, i) => { sum = sum + member["POWER"]; });

      updated["GROUPS"][`${groupNo}`]["GROUP_POWER"] = members.length ? sum : 0;

      setReady(setInitDatas("BTL_DT", "DETAIL")); // reset
      db.writeNewData("USER_CARDS", login.ID, updated);
      return updated
    });
  }

  const setReadyForBattle = (groupNo, detail) => {
    const active = (ready.CONTENDER_GROUP_NO != groupNo) ? groupNo : 0;
    const uniqueKey = new Date().getTime().toString(36)

    setReady({
      ...ready,
      KEY: active ? uniqueKey : "",
      CONTENDER_ID : active ? login.ID : "",
      CONTENDER_NAME : active ? login.NAME : "",
      CONTENDER_GROUP_NO: active,
      CONTENDER_GROUP_POWER: active ? detail.GROUP_POWER : 0,
      CONTENDER_GROUP_MEMBERS: active ? detail.MEMBERS : [],
      TIME_STAMP: active ? time() : ""
    });
  }

  const requestBattle = async (userInfo) => { // DEFENDER 정보
    setReady((ready) => {
      const updated  = { ...ready, ...userInfo };
      setMainPopup({ state: true, type: "BTL_REQ_SENT", data: updated });
      return updated
    });

    setBattleDetail((battleDetail) => {
      const copied = { ...battleDetail };
      copied.DETAIL = [ ...copied.DETAIL, ready ];
      
      console.log("copied: ", copied);
      return copied;
    });
  }

  const getInitTableDatas = async () => {
    const USER_ID = login.ID || "", USER_NAME = login.NAME || ""; 

    const BTL_DT = await db.getSingleData("BTL_DT", USER_ID);
    if(BTL_DT) setBattleDetail({ ...battleDetail, ...BTL_DT, USER_ID, USER_NAME });
    if(!BTL_DT) setBattleDetail({ ...battleDetail, USER_ID, USER_NAME });
  }

  useEffect(() => {
    login.state && getInitTableDatas();
  }, [login]);

  const [ swiper, setSwiper ] = useState(null);

  return (
    <HomePage onClick={handlePopup}>
      <SectionMain
        newCard={newCard}
        selectNewOrPrev={selectNewOrPrev}
        cards={cards}
        setCards={setCards}
        mainCard={mainCard}
        setMainCard={setMainCard}
        keepSelectedCard={keepSelectedCard}
        upgradeCard={upgradeCard}
        login={login} />
      <SectionFrdSearch 
        login={login}
        mainPopup={mainPopup}
        setMainPopup ={setMainPopup}
        sOpen={selectBoxes.FRD.show}
        handleSelectBoxes ={handleSelectBoxes } />
      <SectionFrdList
        frd={frd}
        setFrd={setFrd}
        ready={ready}
        requestBattle={requestBattle}
        battleDetail={battleDetail}
        setBattleDetail={setBattleDetail}
        login={login}/>
      <SectionGroup
        login={login}
        swiper={swiper}
        setSwiper={setSwiper}
        cards={cards}
        setCards={setCards}
        removeCardFromGroup={removeCardFromGroup}
        setReadyForBattle={setReadyForBattle}
        ready={ready} />
      <SectionStorage
        login={login}
        cards={cards}
        setCards={setCards}
        mainCard={mainCard}
        setMainCard={setMainCard}
        selectNewOrPrev={selectNewOrPrev}
        ready={ready}
        setReady={setReady}
        mainPopup={mainPopup}
        setMainPopup ={setMainPopup} />
        {/* <ButtonScrollUp /> */}
        <Alarm
          login={login}
          alarm={alarm}
          setAlarm={setAlarm}
          mainPopup={mainPopup} 
          setMainPopup={setMainPopup} />
        <MainPopup
            login={login}
            frd={frd}
            setFrd={setFrd}
            ready={ready}
            battleDetail={battleDetail}
            setBattleDetail={setBattleDetail}
            alarm={alarm}
            setAlarm={setAlarm}
            handleSelectBoxes={handleSelectBoxes}
            mainPopup={mainPopup} 
            setMainPopup={setMainPopup}
            cards={cards}
            setCards={setCards} />
    </HomePage>
  )
}

export default Home

const HomePage = styled.div`
  padding-bottom: 600px;
`;