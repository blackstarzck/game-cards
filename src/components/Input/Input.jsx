import React from 'react'
import { Button } from '../Button/Button'
import { Wrapper, InputDefault, SelectDefault, InputNickName, SelectJob, SelectContainer } from './input.elements'

export const Input = ({ children, ...props }) => <InputDefault {...props} value={children}></InputDefault>
export const Select = ({ children, ...props }) => <SelectDefault {...props} value={children}></SelectDefault>

Input.NickName = ({ children, ...props }) => {
    return(
        <Wrapper className="input-wrapper">
            <InputNickName {...props} value={children}></InputNickName>
            <Button.TextClear />
        </Wrapper>
    );
}

Select.Job = ({ children, ...props }) => {
    const list = props["list"];

    return(
        <Wrapper className="job-wrapper">
            <Wrapper className="show-selected">
                <SelectJob {...props}>{children}</SelectJob>
                <Button.ArrowDown />
            </Wrapper>
            <Select.Container list={list} />
        </Wrapper>
    );
}

Select.Container = ({ list }) => {
    return(
        <SelectContainer>
            {list.map(list => (
                <li key={list.key}>
                    <span>{list.KR}</span>
                    <span>{list.EN}</span>
                </li>
            ))}
        </SelectContainer>
    );
}