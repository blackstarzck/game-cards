import React from 'react'
import { Description } from '../../Texts/Texts'
import CardSetting from '../CardSetting/CardSetting'
import UploadButtons from '../UploadButtons/UploadButtons'
import {
    DefaultSection, MainSection, FrdSearchSection, Wrapper, Container
} from './Section.elements'
import styles from "./Section.module.css"

export const Section = ({ Children, ...props }) => <DefaultSection {...props}>{Children}</DefaultSection>

Section.Main = ({ Children, ...props }) => {
    return (
        <MainSection {...props}>
            {/* LEFT */}
            <Container className='left-container'>
                <UploadButtons />
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
                <CardSetting />
            </Container>
        </MainSection>
    )
}

Section.FrdSearch = ({ Children, ...props }) => {
    return (
        <FrdSearchSection {...props}>{Children}</FrdSearchSection>
    )
}