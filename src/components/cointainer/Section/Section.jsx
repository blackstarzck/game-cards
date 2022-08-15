import React, { useEffect, useRef, useState } from 'react'
import { DescriptionLI } from '../../Texts/Texts'
import MainView from '../MainView/MainView'
import MainViewer from '../MainViewer/MainViewer'
import UploadButtons from '../UploadButtons/UploadButtons'
import { MainSection, FrdSearchSection, Wrapper, Container } from './Section.elements'
import Database from '../../../service/database'
import { randomName } from '../../../assets/random-generator/random-generator'


const data = new Database();

export const SectionMain = ({login}) => {
    const [ mainCard, setMainCard ] = useState({
        nickName: randomName(),
        jobKR: "",
        jobEN: "",
        level: 1,
        exp: 0,
        groupNo: 0,
        stats: { STR: 0, AGI: 0, DEX: 0, VIT: 0, INT: 0, LUCK: 0 },
        remain: 0,
        code: "",
        descr: "",
        quote: "",
        selected: 0,
        imgURL: "",
    });
    const [ expression, setExpression ] = useState({
        age: 0,
        gender: "",
        expression: {
            name: "",
            value: 0
        }
    });
    const [ imgLoaded, setImgLoaded ] = useState(false);

    const [ newCard, setNewCard ] = useState(false);
          
    const selectNewOrPrev = () => setNewCard(!newCard);
  
    const onChange = (e) => { // input change 이벤트
      const { value, name } = e.target;
      setMainCard({ ...mainCard, [name]: value });
    }
  
    const updateCard = (data) => { // 클릭에 이벤트
        console.log("업데이트: ", data);
        setMainCard(mainCard => (
            { ...mainCard, [data.key]: data.value }
        ));
    }

    const getFaceResult = (result) => setExpression(result);

    useEffect(() => {
        console.log("SectionMain:", login);
    }, [login]);

    useEffect(() => {
        if(expression.age !== 0 && expression.gender !== ""){
            const resultCardCode = getCardCode(expression);
            console.log("resultCardCode: ", resultCardCode);
            data.getSingleData("CARDS_INFO", resultCardCode.code)
            .then((result) => {
                console.log("card-info", result);
                setImgLoaded(true);
                setMainCard((mainCard) => {
                    const keyArray = [ "STR", "AGI", "DEX", "VIT", "INT", "LUCK" ];
                    const max = 5;
                    const updated = {...mainCard};
                    updated["code"] = resultCardCode.code;
                    updated["imgURL"] = resultCardCode.imgURL;
                    updated["quote"] = result.QUOTE;
                    updated["descr"] = result.DESCR;
                    updated["selected"] = result.SELECTED;

                    for(let i = 0; i < keyArray.length; i++){
                        let key = keyArray[i];
                        updated["stats"][key] = Math.floor((Math.random() * ((max) - 1)) + 1);
                    }
                    return updated
                });
            });
        }
    }, [expression]);

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
        let initNumb = 50;
        let cardCode, imgURL;

        for(let i = 1; i <= imgTotal; i++){
            range.push({ 
                min: range[i-2] ? (range[i-2].max + 1) : initNumb,
                max: Math.round(50 + (50 / imgTotal) * i)
            });

            if(range[i-1].min <= value && range[i-1].max >= value){
                cardCode = `${code}-${i}`;
                imgURL = `https://firebasestorage.googleapis.com/v0/b/card-maker-89016.appspot.com/o/${dir}%2F${cardCode}.png?alt=media`;
                break;
            }
        }
        // console.log(cardCode, imgURL);
        return { code: cardCode, imgURL: imgURL };
    }

    return (
        <MainSection>
            <MainViewer mainCard={mainCard} />

            {/* LEFT */}
            <Container className='left-container'>
                <UploadButtons 
                    newCard={newCard}
                    selectNewOrPrev={selectNewOrPrev}
                    getFaceResult={getFaceResult}/>
                <Wrapper className='descr-wrapper'>
                    <DescriptionLI>※ 얼굴이 보이는 사진으로 업로드해주세요.</DescriptionLI>
                    <DescriptionLI>※ 하루에 최대 5개만 업로드할 수 있십니다.</DescriptionLI>
                    <DescriptionLI>※ 계정당 보관 가능한 카드는 총 8개 입니다.</DescriptionLI>
                    <DescriptionLI>※ 로그인 후 카드를 보관하실 수 있습니다.</DescriptionLI>
                    <DescriptionLI>※ 업로드한 이미지로 다른 카드를 업그레이드할 수 있습니다.</DescriptionLI>
                    <DescriptionLI>※ 능력치는 랜덤으로 부여되고 최대 수치는 각각 5입니다.</DescriptionLI>
                </Wrapper>
            </Container>

            {/* RIGHTT */}
            <Container className='right-container'>
                <MainView
                    imgLoaded={imgLoaded}
                    mainCard={mainCard}
                    updateCard={updateCard}
                    onChange={onChange}
                />
            </Container>
        </MainSection>
    )
}

export const SectionFrdSearch = () => {
    return (
        <FrdSearchSection></FrdSearchSection>
    )
}