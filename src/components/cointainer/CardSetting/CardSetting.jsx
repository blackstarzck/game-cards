import React from 'react'
import { Button } from '../../Button/Button'
import { Input, Select } from '../../Input/Input'
import { Title } from '../../Texts/Texts'
import { Wrapper } from './CardSetting.elements'

const CardSetting = () => {
    return (
        <>
            <Wrapper className='edit-wrapper'>
                <Button.EditTitle />
                <Wrapper className='name-wrapper'>
                    <Title.NickName>작렬하는 어둠의 파수꾼</Title.NickName>
                    <Title.Job>Frontend Developer</Title.Job>
                </Wrapper>
            </Wrapper>

            <Wrapper className='select-wrapper'>
                <Button.SaveTitle />
                <Wrapper className='input-wrapper'>
                    <Input.NickName />
                    <Select.Job>웹 개발자</Select.Job>
                </Wrapper>
            </Wrapper>
        </>
    )
}

export default CardSetting