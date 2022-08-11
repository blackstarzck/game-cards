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

    &.job-wrapper { width: 100%; }
    &.input-wrapper { width: 100%; }
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
    font-family: "inter", sans-serif;
    font-size: 18px;
    font-weight: 700;
    color: ${ ({ theme }) => theme.colors.commonBlack };
    text-indent: 10px;
    border: 1px solid ${ ({ theme }) => theme.colors.commonBlack };
    cursor: pointer;
    & + button {
        right: 11px;
    }
`;
export const SelectContainer = styled.ul`
    border: 1px solid ${ ({theme}) => theme.colors.commonBlack };
    border-radius: 5px;
    padding: 10px 0;
    
    li {
        display: flex;
        justify-content: space-between;
        font-family: 'Inter',sans-serif;
        font-size: 16px;
        width: ${ prop => `${prop.width}px` };
        height: 30px;
        line-height: 30px;
        font-weight: 400;
        padding: 0 10px;
        cursor: pointer;

        &:hover { background-color: ${ ({theme}) => theme.colors.highLight }; }
    }
`;