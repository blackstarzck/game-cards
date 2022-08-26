import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from "styled-components"
import SectionFrdSearch from '../../components/Section/FrdSearch/FrdSearch';
import SectionMain from '../../components/Section/Main/Section';
import SectionStorage from '../../components/Section/Storage/Storage';
import { setInitDatas } from '../../data/data';
import Database from '../../service/database';
import { setCookie } from '../../util/util';

const db = new Database();

const Home = ({login, cards, setCards }) => {
  const [ mainCard, setMainCard ] = useState(setInitDatas("MAIN_CARD"));

  const [ selectBoxes, setSelectBox ] = useState({ FRD : { show: false } });
  const mainPopup = useRef(false);
  const navigate = useNavigate();

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

  const keepSelectedCard = async (result) => {
    const POWER = mainCard.STATS.STR + mainCard.STATS.AGI + mainCard.STATS.DEX + mainCard.STATS.VIT + mainCard.STATS.INT + mainCard.STATS.LUCK;
    let cnt = 0;
    if(login.state){
      cards.CARDS.map((card) => {
        if(card.CODE) cnt++;
      });

      if(cnt < 8){
        console.log("write mainCard: ", cards);
        const write = await db.writeNewData("USER_CARDS", login.ID, {...cards});
        
        setCards((cards) => {
          const updated = { ...cards };
          updated["DAILY_CNT"] = updated.DAILY_CNT - 1;

          for(let i = 0; i < updated.CARDS.length; i++){
            if(!updated.CARDS[i].CODE){
              updated.CARDS[i] = { ...updated.CARDS[i], ...mainCard, POWER }
              console.log(updated.CARDS[i]);
              break;
            }
          }
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

  return (
    <HomePage onClick={handlePopup}>
      <SectionMain
        mainCard={mainCard}
        setMainCard={setMainCard}
        keepSelectedCard={keepSelectedCard}
        login={login} />
      <SectionFrdSearch 
        login={login}
        mainPopup={mainPopup}
        sOpen={selectBoxes.FRD.show}
        handleSelectBoxes ={handleSelectBoxes } />
      <SectionStorage
        cards={cards}
        setCards={setCards}
        login={login}/>
    </HomePage>
  )
}

export default Home

const HomePage = styled.div`
  padding-bottom: 600px;
`;