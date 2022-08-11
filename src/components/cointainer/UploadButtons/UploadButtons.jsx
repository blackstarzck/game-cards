import React from 'react'
import { ButtonUpload, ButtonRecruit, ButtonGetPrev } from '../../Button/Button'
import { Wrapper } from './UploadButtons.elements'

const UploadButtons = () => {
    return (
        <Wrapper className="outer-wrapper">
            <ButtonUpload />
            <Wrapper className="inner-wrapper">
                <ButtonRecruit />
                <ButtonGetPrev />
            </Wrapper>
        </Wrapper>
    )
}

export default UploadButtons