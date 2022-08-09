import React from 'react'
import { Button } from '../../Button/Button'
import { Wrapper } from './UploadButtons.elements'

const UploadButtons = () => {
    return (
        <Wrapper className="outer-wrapper">
            <Button.Upload />
            <Wrapper className="inner-wrapper">
                <Button.Recruit />
                <Button.LevelUp />
            </Wrapper>
        </Wrapper>
    )
}

export default UploadButtons