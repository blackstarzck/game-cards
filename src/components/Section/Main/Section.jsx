import React, { useEffect, useRef, useState } from 'react'
import { DescriptionLI } from '../../Texts/Texts'
import MainView from '../../cointainer/MainView/MainView'
import MainViewer from '../../cointainer/MainViewer/MainViewer'
import UploadButtons from '../../cointainer/UploadButtons/UploadButtons'
import { MainSection, Wrapper, Container } from './Section.elements'
import Database from '../../../service/database'
import { detectGIF, rememberCardData, setCookie } from '../../../util/util'
import { randomName, setInitDatas } from '../../../data/data'

const data = new Database();

const SectionMain = ({login, cards, setCards, mainCard, setMainCard, keepSelectedCard, upgradeCard, newCard, selectNewOrPrev}) => {
    const [ imgSrc, setImgSrc ] = useState("");
    const [ imgLoaded, setImgLoaded ] = useState(false);
    const [ expression, setExpression ] = useState({
        age: 0,
        gender: "",
        expression: {
            name: "",
            value: 0
        }
    });

    const onChange = (e) => { // input change 이벤트
      const { value, name } = e.target;
      setMainCard({ ...mainCard, [name]: value });
    }
  
    const updateCard = (data) => {
        setMainCard(mainCard => (
            { ...mainCard, [data.key]: data.value }
        ));
    }

    const getFaceResult = (result) => {
        setExpression(expression => expression = result);

        const lists = setInitDatas("JOBS");
        const random = Math.floor((Math.random() * ((lists.length) - 1)) + 1);
        const nickName = randomName();
        const jobKR = lists[random].KR;
        const jobEN = lists[random].EN;

        if(result.age !== 0 && result.gender !== ""){
            const resultCardCode = getCardCode(result);
            if(!resultCardCode.CODE){
                alert("다른 이미지를 업로드해주세요.");
                setImgSrc("");
                setImgLoaded(false);
                return
            }
            
            data.getSingleData("CARDS_INFO", resultCardCode.CODE)
            .then((result) => {
                setImgLoaded(true);
                setMainCard((mainCard) => {
                    const keyArray = [ "STR", "AGI", "DEX", "VIT", "INT", "LUCK" ];
                    const max = 5;
                    const updated = setInitDatas("MAIN_CARD");
                    updated["NICK"] = nickName;
                    updated["JOB_KR"] = jobKR;
                    updated["JOB_EN"] = jobEN;
                    updated["CODE"] = resultCardCode.CODE;
                    updated["IMG_URL"] = resultCardCode.IMG_URL;
                    updated["QUOTE"] = result.QUOTE;
                    updated["DESCR"] = result.DESCR;
                    updated["SELECTED"] = result.SELECTED;

                    for(let i = 0; i < keyArray.length; i++){
                        let key = keyArray[i];
                        updated["STATS"][key] = Math.floor((Math.random() * ((max) - 1)) + 1);
                    }
                    return updated
                });
            });
        }
    }

    useEffect(() => {
        const prevData = rememberCardData();
        if(prevData) setMainCard(prevData)
      }, []);

    useEffect(() => {
        if(!mainCard.code){
            setImgSrc("");
            setImgLoaded(false);
        }
    }, [mainCard]);

    const getCardCode = (imgData) => {
        const cardsCount = {
            NU1 : { F: 10, M: 18 },
            AG1 : { F: 10, M: 16 },
            DG1 : { F: 12, M: 14 },
            FE1 : { F: 10, M: 16 },
            HP1 : { F: 12, M: 14 },
            SD1 : { F: 16, M: 10 },
            SP1 : { F: 10, M: 10 },
            NU2 : { F: 13, M: 15 },
            AG2 : { F: 10, M: 16 },
            DG2 : { F: 12, M: 14 },
            FE2 : { F: 10, M: 16 },
            HP2 : { F: 10, M: 16 },
            SD2 : { F: 15, M: 10 },
            SP2 : { F: 10, M: 11 }
        }

        const expCodes = {
            neutral : "NU",
            angry : "AG",
            disgusted : "DG",
            fearful : "FE",
            happy : "HP",
            sad : "SD",
            surprised : "SP"
        };

        const age = ((imgData.age % 2) === 0) ? "1" : "2";
        const gender = (imgData.gender === "female") ? "F" : "M";
        const { name, value } = imgData.expression;
        const dir = `${expCodes[name]}${age}`;
        const code = `${gender}-${dir}`;
        const imgTotal = cardsCount[dir][gender];
        const range = [];
        let initNumb = 40;
        let numb = (100 - initNumb);
        let cardCode, IMG_URL, fileName;

        for(let i = 1; i <= imgTotal; i++){
            range.push({ 
                min: range[i-2] ? (range[i-2].max + 1) : initNumb,
                max: Math.round(initNumb + (numb / imgTotal) * i)
            });

            if(range[i-1].min <= value && range[i-1].max >= value){
                cardCode = `${code}-${i}`;
                fileName = detectGIF(cardCode);
                IMG_URL = `https://firebasestorage.googleapis.com/v0/b/card-maker-89016.appspot.com/o/${dir}%2F${cardCode}.${fileName}?alt=media`;
                break;
            }
        }
        return { CODE: cardCode, IMG_URL: IMG_URL };
    }

    return (
        <MainSection limit={cards.DAILY_CNT}>
            {/* <MainViewer mainCard={mainCard} /> */}

            {/* LEFT */}
            <Container className='left-container'>
                <span className="daily-count"><b className="count">{cards.DAILY_CNT}</b> / 5</span>
                <UploadButtons
                    imgSrc={imgSrc}
                    setImgSrc={setImgSrc}
                    newCard={newCard}
                    cards={cards}
                    selectNewOrPrev={selectNewOrPrev}
                    getFaceResult={getFaceResult} />
                <Wrapper className='descr-wrapper'>
                    <DescriptionLI>※ 얼굴이 보이는 사진으로 업로드해주세요.</DescriptionLI>
                    <DescriptionLI>※ 하루에 최대 5개만 업로드할 수 있십니다.</DescriptionLI>
                    <DescriptionLI>※ 계정당 보관 가능한 카드는 총 8개 입니다.</DescriptionLI>
                    <DescriptionLI>※ 로그인 후 카드를 보관하실 수 있습니다.</DescriptionLI>
                    <DescriptionLI>※ 능력치는 랜덤으로 부여되고 최대 수치는 각각 5입니다.</DescriptionLI>
                    <DescriptionLI>※ 레벨업 후 얻게되는 능력 포인트는 확률에 따라 5 ~ 20 사이입니다.</DescriptionLI>
                </Wrapper>
            </Container>

            {/* RIGHTT */}
            <Container className='right-container'>
                <MainView
                    login={login}
                    keepSelectedCard={keepSelectedCard}
                    upgradeCard={upgradeCard}
                    imgSrc={imgSrc}
                    imgLoaded={imgLoaded}
                    setImgLoaded={setImgLoaded}
                    newCard={newCard}
                    mainCard={mainCard}
                    setMainCard={setMainCard}
                    cards={cards}
                    setCards={setCards}
                    updateCard={updateCard}
                    onChange={onChange} />
            </Container>
        </MainSection>
    )
}

export default SectionMain