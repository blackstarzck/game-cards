import React from 'react'
import { Button } from '../../Button/Button'
import { Input, Select } from '../../Input/Input'
import { Title } from '../../Texts/Texts'
import { BookMark, CardImg, StatItem, Wrapper } from './CardSetting.elements'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/pro-solid-svg-icons'

const CardSetting = () => {
    return (
        <Wrapper className="main-view">
            {/* SWITCH */}
            <Wrapper className="ability-btns">
                <Button.Stat />
                <Button.Skill />
            </Wrapper>

            <CardSetting.Name />
            <CardSetting.EditName />

            <Wrapper className="body">
                {/* STAT CTRL */}
                <CardSetting.StatContainer />

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
                        <Button.LevelUp />
                        <div className="outer">
                            <div className="inner"></div>
                        </div>
                    </Wrapper>

                </Wrapper> 
            </Wrapper>
            <Wrapper className="btn-handlers">
                    <Button.Reset />
                    <Button.Save />
                    <Button.ViewInfo />
                    <Button.KeepCard />
                </Wrapper>
        </Wrapper>
    )
}

export default CardSetting;

CardSetting.StatContainer = (props) => {
    return(
        <Wrapper className="stat-wrapper">
            <span className="total-points">5</span>
            <Wrapper className="list-wrapper">
                <CardSetting.Stat heading={"STR"} points={0}/> 
                <CardSetting.Stat heading={"AGI"} points={0}/> 
                <CardSetting.Stat heading={"DEX"} points={0}/> 
                <CardSetting.Stat heading={"VIT"} points={0}/> 
                <CardSetting.Stat heading={"INT"} points={0}/> 
                <CardSetting.Stat heading={"LUCK"} points={0}/> 
            </Wrapper>
        </Wrapper>
    );
}

CardSetting.Stat = (props) => {
    return(
        <StatItem>
            <span className="heading">{props.heading}</span>
            <span className="points">{props.points}</span>
            <Wrapper className="btn-wrapper">
                <Button.StatAdd />
                <Button.StatRemove />
            </Wrapper>
        </StatItem>
    );
}

CardSetting.Name = () => {
    return(
        <Wrapper className='edit-wrapper'>
            <Button.EditTitle />
            <Wrapper className='input-wrapper'>
                <Title.NickName>작렬하는 어둠의 파수꾼</Title.NickName>
                <Title.Job>Frontend Developer</Title.Job>
            </Wrapper>
        </Wrapper>
    );
};

CardSetting.EditName = () => {
    const list = { 
        job: {
            item: [
                { key: 1, KR: "소프트웨어 엔지니어", EN: "Software Engineer" },
                { key: 2, KR: "프론트앤드 개발자", EN: "Frontend Developer" },
                { key: 3, KR: "백앤드 개발자", EN: "Backend Developer" },
                { key: 4, KR: "기획자", EN: "Planner" },
                { key: 5, KR: "디자이너", EN: "Designer" }
            ]
        },
        etc: {
            item: [ "1" , "2", "3", "4" ]
        }
    };

    return(
        <Wrapper className='select-wrapper'>
            <Button.SaveTitle />
            <Wrapper className='custom-wrapper'>
                <Input.NickName />
                <Select.Job list={list.job.item}>웹 개발자</Select.Job>
            </Wrapper>
        </Wrapper>
    );
};
