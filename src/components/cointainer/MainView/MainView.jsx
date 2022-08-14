import React, { useEffect, useState } from 'react'
import { ButtonStat, ButtonSkill, ButtonReset, ButtonSave, ButtonViewInfo, ButtonKeepCard, ButtonLevelUp, ButtonSaveTitle, ButtonStatAdd, ButtonStatRemove, ButtonEditTitle } from '../../Button/Button'
import { InputNickName, SelectJob } from '../../Input/Input'
import { Title } from '../../Texts/Texts'
import { BookMark, CardImg, StatItem, Wrapper } from './MainView.elements'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/pro-solid-svg-icons'


const MainView = ({...props}) => {
    const [ jobSelected, setJobSelected ] = useState(null);

    return (
        <Wrapper className="main-view">
            {/* SWITCH */}
            <Wrapper className="ability-btns">
                <ButtonStat />
                <ButtonSkill />
            </Wrapper>

            {/* NAME EDIT */}
            <MainViewName />
            <MainViewEditName card={props.card} updateCard={props.updateCard} onChange={props.onChange} />

            <Wrapper className="body">
                {/* STAT CTRL */}
                <MainViewStatContainer />

                {/* CARD VIEW */}
                <Wrapper className="view-wrapper">
                    
                    <Wrapper className="view-box">
                        {/* BOOKMARK */}
                        <BookMark>
                            <FontAwesomeIcon icon={faBookmark} />
                            <span className="group-no">01</span>
                        </BookMark>

                        {/* IMG */}
                        <CardImg><img src="https://firebasestorage.googleapis.com/v0/b/card-maker-89016.appspot.com/o/HP2%2FF-HP2-2.gif?alt=media" alt="카드 이미지" /></CardImg>
                        
                        {/* RANK */}
                        <Wrapper className="text-wrapper">
                            <span className="level"><b>Lv.</b>1</span>
                            <span className="pref-rank">선호순위 9위</span>
                        </Wrapper>
                    </Wrapper>

                    {/* STORY */}
                    <Wrapper className="story-box">
                        <h4>"내 키보드 소리가 어떻다구?"</h4>
                        <p>나는 기계식 키보드가 좋아. 기계식 키보드는 역시 청축키를 써야 제맛 이지. 나에게 적축키를 강요하지할 라구!</p>
                    </Wrapper>

                    {/* EXPERIENCE */}
                    <Wrapper className="exp-wrapper">
                        <ButtonLevelUp />
                        <div className="outer">
                            <div className="inner"></div>
                        </div>
                    </Wrapper>
                </Wrapper> 
            </Wrapper>
            <Wrapper className="btn-handlers">
                    <ButtonReset />
                    <ButtonSave />
                    <ButtonViewInfo />
                    <ButtonKeepCard />
                </Wrapper>
        </Wrapper>
    )
}

export default MainView;


export const MainViewStatContainer = (props) => {
    return(
        <Wrapper className="stat-wrapper">
            <span className="total-points">5</span>
            <Wrapper className="list-wrapper">
                <MainViewStat heading={"STR"} points={0}/> 
                <MainViewStat heading={"AGI"} points={0}/> 
                <MainViewStat heading={"DEX"} points={0}/> 
                <MainViewStat heading={"VIT"} points={0}/> 
                <MainViewStat heading={"INT"} points={0}/> 
                <MainViewStat heading={"LUCK"} points={0}/> 
            </Wrapper>
        </Wrapper>
    );
}

export const MainViewStat = (props) => {
    return(
        <StatItem>
            <span className="heading">{props.heading}</span>
            <span className="points">{props.points}</span>
            <Wrapper className="btn-wrapper">
                <ButtonStatAdd />
                <ButtonStatRemove />
            </Wrapper>
        </StatItem>
    );
}

export const MainViewName = () => {
    return(
        <Wrapper className='edit-wrapper'>
            <ButtonEditTitle />
            <Wrapper className='input-wrapper'>
                <Title.NickName>작렬하는 어둠의 파수꾼</Title.NickName>
                <Title.Job>Frontend Developer</Title.Job>
            </Wrapper>
        </Wrapper>
    );
};

export const MainViewEditName = ({...props}) => {

    // console.log("3. MainViewEditName", updateCard);

    return(
        <Wrapper className='select-wrapper'>
            <ButtonSaveTitle />
            <Wrapper className='custom-wrapper'>
                <InputNickName card={props.card} onChange={props.onChange} updateCard={props.updateCard}/>
                <SelectJob card={props.card} updateCard={props.updateCard}>웹 개발자</SelectJob>
            </Wrapper>
        </Wrapper>
    );
};
