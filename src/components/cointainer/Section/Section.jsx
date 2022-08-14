import React from 'react'
import { Description } from '../../Texts/Texts'
import MainView from '../MainView/MainView'
import UploadButtons from '../UploadButtons/UploadButtons'
import { MainSection, FrdSearchSection, Wrapper, Container } from './Section.elements'

export const SectionMain = ({...props}) => {

    return (
        <MainSection>
            {/* LEFT */}
            <Container className='left-container'>
                <UploadButtons newCard={props.newCard} selectNewOrPrev={props.selectNewOrPrev} />
                <Wrapper className='descr-wrapper'>
                    <Description.li>※ 얼굴이 보이는 사진으로 업로드해주세요.</Description.li>
                    <Description.li>※ 하루에 최대 5개만 업로드할 수 있십니다.</Description.li>
                    <Description.li>※ 계정당 보관 가능한 카드는 총 8개 입니다.</Description.li>
                    <Description.li>※ 로그인 후 카드를 보관하실 수 있습니다.</Description.li>
                    <Description.li>※ 업로드한 이미지로 다른 카드를 업그레이드할 수 있습니다.</Description.li>
                    <Description.li>※ 능력치는 랜덤으로 부여되고 최대 수치는 각각 5입니다.</Description.li>
                </Wrapper>
            </Container>

            {/* RIGHTT */}
            <Container className='right-container'>
                <MainView
                    card={props.card}
                    updateCard={props.updateCard}
                    onChange={props.onChange}
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