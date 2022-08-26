import React, { useState, useEffect, useRef } from 'react'
import { CardStyles, ViewContainerStyles, GroupSection, ViewStyles, DetailContainerStyles, GroupStyles } from './Group.elements'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight, faCircleMinus } from '@fortawesome/pro-light-svg-icons'
import { faRankingStar, faSwords } from '@fortawesome/pro-thin-svg-icons'
import test from "../../../assets/images/F-HP2-2.gif"
import { ButtonBattle } from '../../Button/Button'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import 'swiper/css';
import { text } from '@fortawesome/fontawesome-svg-core'


const SectionGroup = ({login, cards, setCards}) => {
    const [ groups, setGroup ] = useState({
        NO1 : { ...cards.GROUPS.NO1, ACTIVE: "inactive", STR: 0, VIT: 0, AGI: 0, INT: 0, DEX: 0, LUCK: 0 },
        NO2 : { ...cards.GROUPS.NO2, ACTIVE: "inactive", STR: 0, VIT: 0, AGI: 0, INT: 0, DEX: 0, LUCK: 0 },
        NO3 : { ...cards.GROUPS.NO3, ACTIVE: "inactive", STR: 0, VIT: 0, AGI: 0, INT: 0, DEX: 0, LUCK: 0 }
    });
    const [ swiper, setSwiper ] = useState(null);

    const setSum = (gropNo) => {
        const members = gropNo.MEMBERS;
        const STR = members.reduce((accum, curr) => { return accum + curr.STR; }, 0);
        const VIT = members.reduce((accum, curr) => { return accum + curr.VIT; }, 0);
        const AGI = members.reduce((accum, curr) => { return accum + curr.AGI; }, 0);
        const INT = members.reduce((accum, curr) => { return accum + curr.INT; }, 0);
        const DEX = members.reduce((accum, curr) => { return accum + curr.DEX; }, 0);
        const LUCK = members.reduce((accum, curr) => { return accum + curr.LUCK; }, 0);        
        return { STR, VIT, AGI, INT, DEX, LUCK }
    }

    const updateGroups = async () => {
        const tempArray = [ "NO1", "NO2", "NO3" ];
        let active = "";

        for(let i = 0; i < tempArray.length; i++){
            let data = setSum(cards.GROUPS[`${tempArray[i]}`]);
            let { STR, VIT, AGI, INT, DEX, LUCK } = data;

            if(!active && cards.GROUPS[`${tempArray[i]}`]["MEMBERS"].length > 0) active = `${tempArray[i]}`;

            let set = await setGroup((group) => {
                const updated = {...group };
                updated[`${tempArray[i]}`] = { ...cards.GROUPS[`${tempArray[i]}`], ACTIVE: "inactive", STR, VIT, AGI, INT, DEX, LUCK }
                if(tempArray[i] === active) updated[`${active}`] =  { ...updated[`${tempArray[i]}`], ACTIVE: "active" }
                return updated
            });
        }
    }

    const handlePage = (index) => {
        console.log("current index: ", index);
        setGroup((groups) => {
            const temp = [ "NO1", "NO2", "NO3" ];
            const updated = {...groups };
            for(let i = 0; i < temp.length; i++){
                if(index === i){
                    updated[`${temp[index]}`] = { ...groups[`${temp[index]}`], ACTIVE: "active"};
                }else{
                    updated[`${temp[i]}`] = { ...groups[`${temp[i]}`], ACTIVE: "inactive"};
                }
            }
            return updated;
        });
    }

    useEffect(() => {
        updateGroups();
    }, [cards]);

    return (
        <GroupSection>
            {/* left */}
            <ViewContainer
                login={login}
                cards={cards}
                groups={groups}
                swiper={swiper}
                setSwiper={setSwiper}
                handlePage={handlePage}
                setGroup={setGroup} />

            {/* right */}
            <DetailContainer
                login={login}
                groups={groups}
                setGroup={setGroup}
                swiper={swiper}
                setSwiper={setSwiper}
                handlePage={handlePage} />
        </GroupSection>
    )
}

export default SectionGroup

export const ViewContainer = ({groups, handlePage, swiper, setSwiper}) => {
    const [ current, setCurrent ] = useState(false);

    useEffect(() => {
        const temp = [ "NO1", "NO2", "NO3" ];

        for(let i = 0; i < temp.length; i++){
            if(groups[`${temp[i]}`].ACTIVE === "active" && !current){
                groups[`${temp[i]}`].ACTIVE === "active" && swiper.slideTo(i);
                setCurrent(true)
            }
        }
    }, [groups]);

    return(
        <ViewContainerStyles>
            <div className="btns-wrapper">
                <button className="btn-prev" onClick={() => swiper.slidePrev()}><FontAwesomeIcon icon={faChevronLeft} /></button>
                <button className="btn-next" onClick={() => swiper.slideNext()}><FontAwesomeIcon icon={faChevronRight} /></button>
            </div>

            <ViewStyles>
                <Swiper
                    // spaceBetween={50}
                    onInit={(ev) => setSwiper(ev)}
                    slidesPerView={1}
                    onSlideChange={(page) => handlePage(page.activeIndex)}
                    // onSwiper={(swiper) => console.log(swiper)}
                    >
                    <SwiperSlide><Group group={groups["NO1"]}/></SwiperSlide >
                    <SwiperSlide><Group group={groups["NO2"]}/></SwiperSlide >
                    <SwiperSlide><Group group={groups["NO3"]}/></SwiperSlide >
                </Swiper>
            </ViewStyles>
        </ViewContainerStyles>
    );
}

export const Group = ({groups}) => {
    return(
        <>
            {/* <span className="info">보관중인 카드에서<br/>원하는 카드로 그룹을 만들어보세요.</span> */}
            <GroupStyles className="cards-wrapper">
                <Card groups={groups} />
                <Card groups={groups} />
                <Card groups={groups} />
            </GroupStyles>
        </>
    );
}

export const DetailContainer = ({login, groups, swiper}) => {
    const [ stat, setStat ] = useState(groups);

    useEffect(() => {
        groups["NO1"].ACTIVE === "active" && setStat(groups["NO1"]);
        groups["NO2"].ACTIVE === "active" && setStat(groups["NO2"]);
        groups["NO3"].ACTIVE === "active" && setStat(groups["NO3"]);
    }, [groups]);

    return(
        <DetailContainerStyles>
            <ul className="pagenation">
                <li className={groups.NO1.ACTIVE === "active" ? "group-no active" : "group-no" } onClick={() => swiper.slideTo(0)}>1</li>
                <li className={groups.NO2.ACTIVE === "active" ? "group-no active" : "group-no" } onClick={() => swiper.slideTo(1)}>2</li>
                <li className={groups.NO3.ACTIVE === "active" ? "group-no active" : "group-no" } onClick={() => swiper.slideTo(2)}>3</li>
            </ul>
            <div className="stats-box">
                <ul>
                    <li className="stat-row">
                        <div className="stat"><span className="stat-name">STR</span><span className="stat-points">{stat.STR}</span></div>
                        <div className="stat"><span className="stat-name">VIT</span><span className="stat-points">{stat.VIT}</span></div>
                    </li>
                    <li className="stat-row">
                        <div className="stat"><span className="stat-name">AGI</span><span className="stat-points">{stat.AGI}</span></div>
                            <div className="stat"><span className="stat-name">INT</span><span className="stat-points">{stat.INT}</span></div>
                    </li>
                    <li className="stat-row">
                        <div className="stat"><span className="stat-name">DEX</span><span className="stat-points">{stat.DEX}</span></div>
                        <div className="stat"><span className="stat-name">LUCK</span><span className="stat-points">{stat.LUCK}</span></div>
                    </li>
                </ul>
            </div>
            <div className="data-box">
                <div className="rank"><FontAwesomeIcon icon={faRankingStar}/>{stat.GROUP_RANK || "-"}</div>
                <div className="power"><FontAwesomeIcon icon={faSwords}/>{stat.GROUP_POWER}</div>
            </div>
            <ButtonBattle />
        </DetailContainerStyles>
    );
}

export const Card = ({login, groups, setGroup}) => {
    return(
        <CardStyles>
            <button className="btn-remove"><FontAwesomeIcon icon={faCircleMinus}/></button>
            <div className="img-box"><img src={test} alt="" /></div>
            <marquee behavior="scroll" direction="right" className="nick-name">개발자는 노예다</marquee>
            <marquee behavior="scroll" direction="right" scrolldelay ="100" className="quote">따라올테면 따라와봐</marquee>
            <span className="level"><b>Lv. </b>2</span>
        </CardStyles>
    );
}