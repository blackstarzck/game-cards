import styled from "styled-components";

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
        width: 100%;
        border: 1px solid ${ ({ theme }) => theme.colors.commonBlack };
        border-radius: 5px;    
    }
    &.search-wrapper {
        width: 100%;
        position: relative;
        margin-top: 20px;

        .btn-clear { right: 45px; }
    }
    &.pwd-input-wrapper {
        position: relative;

        .btns-wrapepr {
            width: 50px; height: 50px;
            position: absolute;
            top: 0; right: 0;
        }
    }
`;

export const NickNameInput = styled.input`
    height: 32px;
    font-family: "inter",sans-serif;
    font-size: 18px;
    font-weight: 700;
    color: ${ ({ theme }) => theme.colors.commonBlack };
    text-indent: 10px;
    border: 1px solid ${ ({ theme }) => theme.colors.commonBlack };
    position: relative;
    width: 100%;
    border-radius: 5px;
    
    &::placeholder {
        font-weight: 300;
        color: ${ ({ theme }) => theme.colors.inActiveButtonBg };
    }
    & + button {
        right: 11px;
    }
`;

export const FrdSrchInput = styled.input.attrs( props => ({ type: "text"}) )`
    font-size: 1rem;
    width: 100%;
    height: 38px;
    border: 1px solid ${ (props) => props.readOnly ? props.theme.colors.border : props.theme.colors.commonBlack};
    border-radius: 5px;
    text-indent: 10px;

    &::placeholder { color: ${({theme}) => theme.colors.inputPlaceHolder} };
`;

export const JobSelect = styled(SelectDefault)`
    height: 32px;
    line-height: 32px;
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
    position: absolute;top: 0; left: 0;z-index: -1;
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

export const EmailInput = styled.input`
    width: 100%;
    height: 50px;
    font-size: 20px;
    font-weight: 400;
    color: ${({theme}) => theme.colors.commonBlack };
    border: 1px solid ${props => props.active ? props.theme.colors.commonBlack : props.theme.colors.border };
    text-indent: 20px;
    border-radius: 5px;

    &::placeholder {
        color: #D9D9D9; 
    }
`;
export const PwdInput = styled(EmailInput).attrs( props => ({ type: props.eyeOpen ? "text" : "password" }) )`

`;

export const FormInput = styled.input.attrs( props => ({ type: props.type, data: props.validate, autoComplete: "off" }) )`
    width: 337px;
    height: 40px;
    border: 1px solid ${props => props.active ? props.theme.colors.commonBlack : props.theme.colors.border };
    border-radius: 5px;
    text-indent: 12px;
`;

export const InputSearchContainer = styled.div`
    display: flex;
    .heading {
        width: 70px;
        height: 40px;
        font-size: 18px;
        font-weight: 600;
        line-height: 40px;
        text-align: center;
        background-color: ${ props => props.theme.colors.realWhite };
        border-top-left-radius: 25px;
        border-bottom-left-radius: 25px;
        border: 1px solid ${ props => props.theme.colors.border };
        border-right: 0;
        position: relative;

        &::after {
            content: "";
            width: 1px;
            height: 60%;
            background-color: #D9D9D9;
            position: absolute;
            top: 0; right: 0; bottom: 0; margin: auto;
        }
    }
    .btn-wrapper {
        background-color: ${ props => props.theme.colors.realWhite };
        border: 1px solid ${ props => props.theme.colors.border };
        border-top-right-radius: 25px;
        border-bottom-right-radius: 25px;
        border-left: 0;
        padding-right: 10px;
        overflow: hidden;
        
        button {
            width: 40px;
            height: 38px;
            font-size: 1.2rem;
        }
        .btn-clear { color: #E2E2E2 }
    }

`;

export const InputSearch = styled.input`
    width: 270px;
    height: 40px;
    font-size: 18px;
    text-indent: 15px;
    border-top: 1px solid ${ props => props.theme.colors.border };
    border-bottom: 1px solid ${ props => props.theme.colors.border };

    &::placeholder {
        color: #E2E2E2;
    }
`;