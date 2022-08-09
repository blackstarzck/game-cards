import styled from "styled-components";

export const InputDefault = styled.input`
    position: relative;
    width: 100%;
    border-radius: 5px;
`;

export const SelectDefault = styled.div`
    position: relative;
    width: 100%;
    border-radius: 5px;
`;

export const Wrapper = styled.div`
    position: relative;
    width: ${ (prop) => `${prop.width}px` };
`;

export const InputNickName = styled(InputDefault)`
    height: 38px;
    font-size: 18px;
    font-weight: 500;
    color: ${ ({ theme }) => theme.colors.commonBlack };
    text-indent: 10px;
    border: 1px solid ${ ({ theme }) => theme.colors.commonBlack };

    & + button {
        right: 11px;
    }
`;

export const SelectJob = styled(SelectDefault)`
    height: 38px;
    line-height: 38px;
    font-size: 18px;
    font-weight: 500;
    color: ${ ({ theme }) => theme.colors.commonBlack };
    text-indent: 10px;
    border: 1px solid ${ ({ theme }) => theme.colors.commonBlack };

    & + button {
        right: 11px;
    }
`;
