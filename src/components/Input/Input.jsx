import React from 'react'
import { Button } from '../Button/Button'
import { Wrapper, InputDefault, SelectDefault, InputNickName, SelectJob } from './input.elements'

export const Input = ({ children, ...props }) => <InputDefault {...props} value={children}></InputDefault>
export const Select = ({ children, ...props }) => <SelectDefault {...props} value={children}></SelectDefault>

Input.NickName = ({ children, ...props }) => {
    return(
        <Wrapper className="input-wrapper" width={318}>
            <InputNickName {...props} value={children}></InputNickName>
            <Button.TextClear />
        </Wrapper>
    );
}

Select.Job = ({ children, ...props }) => {
    return(
        <Wrapper className="job-wrapper" width={318}>
            <SelectJob {...props}>{children}</SelectJob>
            <Button.ArrowDown />
        </Wrapper>
    );
}