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

    &.job-wrapper { width: 100%;position: relative; }
    &.input-wrapper { width: 100%; }
    &.show-selected {
        border: 1px solid ${ ({ theme }) => theme.colors.commonBlack };
        border-radius: 5px;    
    }
`;

export const NickNameInput = styled(InputDefault)`
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

export const JobSelect = styled(SelectDefault)`
    height: 38px;
    line-height: 38px;
    font-family: "inter", sans-serif;
    font-size: 18px;
    font-weight: 700;
    color: ${ ({ theme }) => theme.colors.commonBlack };
    text-indent: 10px;
    cursor: pointer;
    & + button {
        right: 11px;
    }
`;
export const ContainerSelect = styled.ul`
    width: 100%;
    visibility: hidden;
    position: absolute;top: 0; left: 0;z-index: 3; 
    border: 1px solid ${ ({theme}) => theme.colors.commonBlack };
    border-radius: 5px;
    padding: 10px 0;
    background-color: ${ ({theme}) => theme.colors.realWhite };
    
    li {
        display: flex;
        justify-content: space-between;
        font-family: 'Inter',sans-serif;
        font-size: 16px;
        color: ${ ({theme}) => theme.colors.commonBlack };
        letter-spacing: -.5px;
        width: ${ prop => `${prop.width}px` };
        height: 30px;
        line-height: 30px;
        font-weight: 400;
        padding: 0 10px;
        cursor: pointer;

        &:hover { background-color: ${ ({theme}) => theme.colors.highLight }; }
    }
`;