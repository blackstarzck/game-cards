import { useEffect, useRef, useState } from "react";
import { Background, PopupDescr, PopupMain } from "./Popups.elements";
import { gsap } from "gsap"
import { ButtonYes, ButtonNo } from "../Button/Button";
import Database from "../../service/database";

const db = new Database();

export const DescrPopup = ({statName, visible, popup, setPopup}) => {
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
            // console.log(`%c열기: ${statName} | ${popup}`, "color: red");
        }else{
            reverseFunc();
            // console.log(`%c1. 닫기: ${statName} | ${popup}`, "color: blue");
        }
    }, [popup]);

    useEffect(() => {
        if(popup && (visible.target !== statName)){
            reverseFunc();
        }
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

    return(
        <PopupDescr ref={el}>
            <p><b>{descrArray[statName].name}</b>는(은) {descrArray[statName].info}</p>
        </PopupDescr>
    );
}

export const MainPopup = ({login, data, popup, setPopup, handleSelectBoxes, mainPopup, searchResult}) => {
    const handleClick = async (state) => {
        setPopup(false);
        const frdObj = { ...searchResult, alarm_type: "FRD_REQ_SENT" };
        const myObj = {
            proc: "waiting", 
            result: "success", 
            alarm_type: "FRD_REQ_RECV"
        }

        if(state === "YES"){
            const frd = await db.getSingleData("ALARM_TABLE", frdObj.id);
            myObj.id = login.ID;
            myObj.name = login.NAME;
            myObj.email = login.EMAIL;

            console.log("frdObj: ", frdObj);
            console.log("myObj: ", myObj);

            db.writeNewData("ALARM_TABLE", login.ID, frdObj); // 내 알림에 기록
            db.writeNewData("ALARM_TABLE", frdObj.id, myObj); // 친구 알림에 기록
        }
        
        setTimeout(() => {
            handleSelectBoxes({name: "FRD", state: false});
            mainPopup.current = false;
        }, 400);
    }

    const el = useRef(null);
    const tl = useRef(null);

    useEffect(() => {
        tl.current = gsap.timeline({ pause: true });
        tl.current.fromTo(el.current, { y: -5, opacity: 0 },{
            y: 0, opacity: 1, duration: .3,
            onStart: function(){
                el.current.style.visibility = "visible"
                el.current.style.zIndex = 3;
            }
        });
    }, []);

    useEffect(() => {
        popup ? tl.current.play() : reverseFun();
        if(popup){
            document.body.style.overflow = "hidden";
        }else{
            document.body.style.overflow = "";
        }
    },[popup]);

    const reverseFun = () => {
        tl.current.reverse();
        setTimeout(() => {
            el.current.style.visibility = "hidden";
            el.current.style.zIndex = -1;
        }, 400)
    }

    return(
        <>
            <DimmbedBg popup={popup}/>
            <PopupMain ref={el}>
                <h4><b>{data.id}</b>님에게<br/>친구신청하시겠습니까?</h4>
                <div className="btn-wrapper">
                    <ButtonYes handleClick={() => handleClick("YES")}/>
                    <ButtonNo handleClick={() => handleClick("NO")}/>
                </div>
            </PopupMain>
        </>
    );
}

export const DimmbedBg = ({popup}) => <Background active={popup} className={`dimmed-bg}`}></Background>;