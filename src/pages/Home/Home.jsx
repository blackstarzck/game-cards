import React, { useRef, useState } from 'react'
import { useEffect } from 'react';
import styled from "styled-components"
import SectionFrdSearch from '../../components/Section/FrdSearch/FrdSearch';
import SectionMain from '../../components/Section/Main/Section';
import SectionStorage from '../../components/Section/Storage/Storage';
import Database from '../../service/database';

// const db = new Database();
// db.getSingleData("USER_CARDS", "chanki1004");

const Home = ({login}) => {
  const [ cards, setCards ] = useState({
    UID: "", USER_ID: "", USER_NAME: "",
    CARDS: [
        { KEY: 1, CODE: "", QUOTE: "", DESCR: "", GROUP_NO: 0, GROUP_ORDER: 0, NICK: "", JOB: "", JOB_KR: "", JOB_EN: "", PREF_RANK: 0, REMAIN: 0, LEVEL: 1, STR: 0, AGI: 0, DEX: 0, VIT: 0, INT: 0, LUCK: 0, POWER: 0 },
        { KEY: 2, CODE: "", QUOTE: "", DESCR: "", GROUP_NO: 0, GROUP_ORDER: 0, NICK: "", JOB: "", JOB_KR: "", JOB_EN: "", PREF_RANK: 0, REMAIN: 0, LEVEL: 2, STR: 0, AGI: 0, DEX: 0, VIT: 0, INT: 0, LUCK: 0, POWER: 0 },
        { KEY: 3, CODE: "", QUOTE: "", DESCR: "", GROUP_NO: 0, GROUP_ORDER: 0, NICK: "", JOB: "", JOB_KR: "", JOB_EN: "", PREF_RANK: 0, REMAIN: 0, LEVEL: 0, STR: 0, AGI: 0, DEX: 0, VIT: 0, INT: 0, LUCK: 0, POWER: 0 },
        { KEY: 4, CODE: "", QUOTE: "", DESCR: "", GROUP_NO: 0, GROUP_ORDER: 0, NICK: "", JOB: "", JOB_KR: "", JOB_EN: "", PREF_RANK: 0, REMAIN: 0, LEVEL: 0, STR: 0, AGI: 0, DEX: 0, VIT: 0, INT: 0, LUCK: 0, POWER: 0 },
        { KEY: 5, CODE: "", QUOTE: "", DESCR: "", GROUP_NO: 0, GROUP_ORDER: 0, NICK: "", JOB: "", JOB_KR: "", JOB_EN: "", PREF_RANK: 0, REMAIN: 0, LEVEL: 0, STR: 0, AGI: 0, DEX: 0, VIT: 0, INT: 0, LUCK: 0, POWER: 0 },
        { KEY: 6, CODE: "", QUOTE: "", DESCR: "", GROUP_NO: 0, GROUP_ORDER: 0, NICK: "", JOB: "", JOB_KR: "", JOB_EN: "", PREF_RANK: 0, REMAIN: 0, LEVEL: 0, STR: 0, AGI: 0, DEX: 0, VIT: 0, INT: 0, LUCK: 0, POWER: 0 },
        { KEY: 7, CODE: "", QUOTE: "", DESCR: "", GROUP_NO: 0, GROUP_ORDER: 0, NICK: "", JOB: "", JOB_KR: "", JOB_EN: "", PREF_RANK: 0, REMAIN: 0, LEVEL: 0, STR: 0, AGI: 0, DEX: 0, VIT: 0, INT: 0, LUCK: 0, POWER: 0 },
        { KEY: 8, CODE: "", QUOTE: "", DESCR: "", GROUP_NO: 0, GROUP_ORDER: 0, NICK: "", JOB: "", JOB_KR: "", JOB_EN: "", PREF_RANK: 0, REMAIN: 0, LEVEL: 0, STR: 0, AGI: 0, DEX: 0, VIT: 0, INT: 0, LUCK: 0, POWER: 0 }
    ],
    GROUPS: {
        NO1 : {
            GROUP_POWER: 0,
            GROUP_RANK: 0,
            MEMBERS: [
                { CODE: "", POWER: 0 },
                { CODE: "", POWER: 0 }
            ]
        },
        NO2 : {
            GROUP_POWER: 0,
            GROUP_RANK: 0,
            MEMBERS: [
                { CODE: "", POWER: 0 },
                { CODE: "", POWER: 0 }
            ]
        },
        NO3 : {
            GROUP_POWER: 0,
            GROUP_RANK: 0,
            MEMBERS: [
                { CODE: "", POWER: 0 },
                { CODE: "", POWER: 0 }
            ]
        }
      }
  });
  const cardObj = { CODE: "", QUOTE: "", DESCR: "", GROUP_NO: 0, GROUP_ORDER: 0, NICK: "", JOB_KR: "", JOB_EN: "", PREF_RANK: 0, REMAIN: 0, LEVEL: 0, STR: 0, AGI: 0, DEX: 0, VIT: 0, INT: 0, LUCK: 0, POWER: 0 };
  const groupObj = {
      GROUP_POWER: 0,
      GROUP_RANK: 0,
      MEMBERS: [
          { CODE: "", POWER: 0 },
          { CODE: "", POWER: 0 }
      ]
  }

  const [ selectBoxes, setSelectBox ] = useState({ FRD : { show: false } });
  const mainPopup = useRef(false);

  const handlePopup = (evt) => {
    if(login){
      const targetEle = evt.target.className;
      const targetTag = evt.target.tagName;
      
      if(mainPopup.current === false &&
        (selectBoxes["FRD"].show &&
        (targetEle !== "frd-id" &&
        targetEle !== "dimmed-bg" &&
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

  const handleCardUpdate = (result) => {
    if(!login.state) alert("로그인 후 이용가능하십니다."); // 로그인 페이지로 이동??
    const cardObj = {
      USER_ID: login["ID"], USER_NAME: login["NAME"],
      CODE: result["code"],
      QUOTE: "",
      DESCR: "",
      GROUP_NO: 0, 
      GROUP_ORDER: 0, 
      NICK: result["nickName"],
      JOB_KR: result["jobKR"],
      JOB_EN: result["jobEN"],
      PREF_RANK: 0,
      REMAIN: 0,
      LEVEL: result["level"],
      STR: result.stats["STR"], AGI: result.stats["AGI"], DEX: result.stats["DEX"], VIT: result.stats["VIT"], INT: result.stats["INT"], LUCK: result.stats["LUCK"],
      POWER: (result.stats["STR"] + result.stats["AGI"] + result.stats["DEX"] + result.stats["VIT"] + result.stats["INT"] + result.stats["LUCK"])
    };

    console.log(cardObj);
  }


  return (
    <HomePage onClick={handlePopup}>
      <SectionMain
        handleCardUpdate={handleCardUpdate}
        login={login} />
      <SectionFrdSearch 
        login={login}
        mainPopup={mainPopup}
        sOpen={selectBoxes.FRD.show}
        handleSelectBoxes ={handleSelectBoxes } />
      <SectionStorage
        cards={cards}
        login={login}/>
    </HomePage>
  )
}

export default Home

const HomePage = styled.div`
  padding-bottom: 600px;
`;