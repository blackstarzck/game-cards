import React, { useState, useEffect, useRef } from 'react'
import { CardStyles, ViewContainerStyles, GroupSection, ViewStyles, DetailContainerStyles, GroupStyles } from './Group.elements'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight, faCircleMinus } from '@fortawesome/pro-light-svg-icons'
import { faRankingStar, faSwords } from '@fortawesome/pro-thin-svg-icons'
import { ButtonBattle } from '../../Button/Button'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';


const SectionGroup = ({login, cards, swiper, setSwiper, removeCardFromGroup, setReadyForBattle, ready}) => {
    const [ groups, setGroup ] = useState({
        NO1 : { ...cards.GROUPS.NO1, ACTIVE: "inactive", STR: 0, VIT: 0, AGI: 0, INT: 0, DEX: 0, LUCK: 0 },
        NO2 : { ...cards.GROUPS.NO2, ACTIVE: "inactive", STR: 0, VIT: 0, AGI: 0, INT: 0, DEX: 0, LUCK: 0 },
        NO3 : { ...cards.GROUPS.NO3, ACTIVE: "inactive", STR: 0, VIT: 0, AGI: 0, INT: 0, DEX: 0, LUCK: 0 }
    });

    const [ initSetting, setInitSetting ] = useState(false);
    const prevRef = useRef(null);

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

    const updateGroups = () => {
        const tempArray = [ "NO1", "NO2", "NO3" ];
        let active = "";

        for(let i = 0; i < tempArray.length; i++){
            let data = setSum(cards.GROUPS[`${tempArray[i]}`]);
            let { STR, VIT, AGI, INT, DEX, LUCK } = data;

            if(!initSetting && !active && cards.GROUPS[`${tempArray[i]}`]["MEMBERS"].length > 0){ //  초기세팅
                active = `${tempArray[i]}`;
                setInitSetting(true);
            }

            let set = setGroup((group) => {
                const updated = {...group };
                updated[`${tempArray[i]}`] = { ...cards.GROUPS[`${tempArray[i]}`], ACTIVE: groups[`${tempArray[i]}`].ACTIVE, STR, VIT, AGI, INT, DEX, LUCK }
                if(tempArray[i] === active){
                    updated[`${active}`] =  { ...cards.GROUPS[`${active}`], ACTIVE: "active", STR, VIT, AGI, INT, DEX, LUCK }
                    
                }else{
                    updated[`${tempArray[i]}`] = { ...cards.GROUPS[`${tempArray[i]}`], ACTIVE: groups[`${tempArray[i]}`].ACTIVE, STR, VIT, AGI, INT, DEX, LUCK }
                }
                // console.log(`[1] - ${tempArray[i]}` + " updated:", updated[`${tempArray[i]}`]);
                return updated
            });
        }
    }

    const handlePage = (index) => {
        setGroup((groups) => {
            const temp = [ "NO1", "NO2", "NO3" ];
            const updated = {...groups };
            for(let i = 0; i < temp.length; i++){
                if(index === i){
                    updated[`${temp[i]}`] = { ...groups[`${temp[i]}`], ACTIVE: "active"};
                }else{
                    updated[`${temp[i]}`] = { ...groups[`${temp[i]}`], ACTIVE: "inactive"};
                }
                // console.log(`[2] - ${temp[i]}` + " updated:", updated[`${temp[i]}`]);
            }

            return updated;
        });
    }


    useEffect(() => {
        updateGroups();
        prevRef.current =  groups;
        const prev = prevRef.current;

        if(initSetting){
            let groupNo;
            if(JSON.stringify(prev.NO1.MEMBERS) !== JSON.stringify(cards.GROUPS.NO1.MEMBERS)) groupNo = 0;
            if(JSON.stringify(prev.NO2.MEMBERS) !== JSON.stringify(cards.GROUPS.NO2.MEMBERS)) groupNo = 1;
            if(JSON.stringify(prev.NO3.MEMBERS) !== JSON.stringify(cards.GROUPS.NO3.MEMBERS)) groupNo = 2;
            (groupNo !== undefined) && handlePage(groupNo);
        }
    }, [cards]);

    return (
        <GroupSection login={login.state} className="group-section">
            {/* left */}
            <ViewContainer
                login={login}
                groups={groups}
                swiper={swiper}
                setSwiper={setSwiper}
                handlePage={handlePage}
                setGroup={setGroup}
                removeCardFromGroup={removeCardFromGroup}
                ready={ready} />

            {/* right */}
            <DetailContainer
                login={login}
                cards={cards}
                groups={groups}
                swiper={swiper}
                handlePage={handlePage}
                setReadyForBattle={setReadyForBattle} />
        </GroupSection>
    )
}

export default SectionGroup

export const ViewContainer = ({login, groups, handlePage, swiper, setSwiper, removeCardFromGroup, ready}) => {
    return(
        <ViewContainerStyles>
            <div className="btns-wrapper">
                <button className="btn-prev" onClick={() => { login.state && swiper.slidePrev() }}><FontAwesomeIcon icon={faChevronLeft} /></button>
                <button className="btn-next" onClick={() => { login.state && swiper.slideNext() }}><FontAwesomeIcon icon={faChevronRight} /></button>
            </div>

            <ViewStyles>
                <Swiper
                    // spaceBetween={50}
                    onInit={(ev) => setSwiper(ev)}
                    slidesPerView={1}
                    onSlideChange={(page) => { handlePage(page.activeIndex); }}
                    className="mySwiper"
                    // onSwiper={(swiper) => console.log(swiper)}
                    >
                    <SwiperSlide>
                        { groups["NO1"]["MEMBERS"].length > 0 ?
                            <Group ready={ready.CONTENDER_GROUP_NO === 1 ? true : false} groupNo={"NO1"} member={groups["NO1"]["MEMBERS"]} removeCardFromGroup={removeCardFromGroup} /> :
                            <div className="no-data">보관중인 카드에서 그룹을 지정해주세요.</div> }
                    </SwiperSlide >
                    <SwiperSlide>
                        { groups["NO2"]["MEMBERS"].length > 0 ?
                            <Group ready={ready.CONTENDER_GROUP_NO === 2 ? true : false} groupNo={"NO2"}  member={groups["NO2"]["MEMBERS"]} removeCardFromGroup={removeCardFromGroup} /> :
                            <div className="no-data">보관중인 카드에서 그룹을 지정해주세요.</div> }
                    </SwiperSlide >
                    <SwiperSlide>
                        { groups["NO3"]["MEMBERS"].length > 0 ?
                            <Group ready={ready.CONTENDER_GROUP_NO === 3 ? true : false} groupNo={"NO3"} member={groups["NO3"]["MEMBERS"]} removeCardFromGroup={removeCardFromGroup} /> :
                            <div className="no-data">보관중인 카드에서 그룹을 지정해주세요.</div> }
                    </SwiperSlide >
                </Swiper>
            </ViewStyles>
        </ViewContainerStyles>
    );
}

export const Group = ({member, removeCardFromGroup, groupNo, ready}) => {
    return(
        <>
            <GroupStyles>
                { member.map((card) => <Card key={card.KEY} ready={ready} groupNo={groupNo} card={card} removeCardFromGroup={removeCardFromGroup} />) }
            </GroupStyles>
        </>
    );
}

export const Card = ({card, removeCardFromGroup, groupNo, ready}) => {
    return(
        <CardStyles ready={ready}>
            <button className="btn-remove" onClick={() => removeCardFromGroup(card.KEY, groupNo)}><FontAwesomeIcon icon={faCircleMinus}/></button>
            <div className="img-box"><img src={card.IMG_URL} alt="" /></div>
            <marquee behavior="scroll" direction="right" className="nick-name">{card.NICK}</marquee>
            <marquee behavior="scroll" direction="right" scrolldelay ="100" className="quote">{card.QUOTE}</marquee>
            <span className="level"><b>Lv. </b>{card.LEVEL}</span>
        </CardStyles>
    );
}

export const DetailContainer = ({login, groups, swiper, cards, setReadyForBattle}) => {
    const [ stat, setStat ] = useState(groups);
    const [ active, setActive ] = useState(false);
    const groupNo = useRef(null);

    const handleClick = () => {
        active && setReadyForBattle(groupNo.current, stat)
    }

    useEffect(() => {
        if(groups["NO1"].ACTIVE === "active"){ groupNo.current = 1; setStat(groups["NO1"]); swiper.slideTo(0); }
        if(groups["NO2"].ACTIVE === "active"){ groupNo.current = 2; setStat(groups["NO2"]); swiper.slideTo(1); }
        if(groups["NO3"].ACTIVE === "active"){ groupNo.current = 3; setStat(groups["NO3"]); swiper.slideTo(2); }
        

    }, [groups, cards]);

    useEffect(() => {
        const state = (login.state && stat.MEMBERS?.length > 0) ? true : false;
        setActive(state);
    }, [stat]);

    return(
        <DetailContainerStyles login={login.state}>
            <ul className="pagenation">
                <li className={groups.NO1.ACTIVE === "active" ? "group-no active" : "group-no" } onClick={() => { login.state && swiper.slideTo(0) }}>1</li>
                <li className={groups.NO2.ACTIVE === "active" ? "group-no active" : "group-no" } onClick={() => { login.state && swiper.slideTo(1) }}>2</li>
                <li className={groups.NO3.ACTIVE === "active" ? "group-no active" : "group-no" } onClick={() => { login.state && swiper.slideTo(2) }}>3</li>
            </ul>
            <div className="stats-box">
                <ul>
                    <li className="stat-row">
                        <div className="stat"><span className="stat-name">STR</span><span className="stat-points">{stat.STR || "-"}</span></div>
                        <div className="stat"><span className="stat-name">VIT</span><span className="stat-points">{stat.VIT || "-"}</span></div>
                    </li>
                    <li className="stat-row">
                        <div className="stat"><span className="stat-name">AGI</span><span className="stat-points">{stat.AGI || "-"}</span></div>
                            <div className="stat"><span className="stat-name">INT</span><span className="stat-points">{stat.INT || "-"}</span></div>
                    </li>
                    <li className="stat-row">
                        <div className="stat"><span className="stat-name">DEX</span><span className="stat-points">{stat.DEX || "-"}</span></div>
                        <div className="stat"><span className="stat-name">LUCK</span><span className="stat-points">{stat.LUCK || "-"}</span></div>
                    </li>
                </ul>
            </div>
            <div className="data-box">
                <div className="rank"><FontAwesomeIcon icon={faRankingStar}/>{stat.GROUP_RANK || "-"}</div>
                <div className="power"><FontAwesomeIcon icon={faSwords}/>{stat.STR ? stat.GROUP_POWER : 0}</div>
            </div>
            <ButtonBattle active={active} handleClick={handleClick}/>
        </DetailContainerStyles>
    );
}