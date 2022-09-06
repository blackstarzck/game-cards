import styled, { css } from "styled-components";
import theme from "../../assets/styles/theme";

export const PopupDescr = styled.div`
    width: 268px;
    font-family: "Inter", sans-serif;
    font-size: 14px;
    font-weight: 300;
    letter-spacing: -1px;
    text-align: left;
    color: ${ ({theme}) => theme.colors.realWhite };
    background-color: rgba(0, 0, 0, .7);
    border-radius: 5px;
    padding: 8px 5px 8px 25px;
    z-index: 5;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(15%, -50%);

    p {
        line-height: 20px;
        position: relative;

        &::before { 
            content: ""; 
            display: block; 
            width: 1px; 
            height: 80%; 
            background-color: ${ ({theme}) => theme.colors.realWhite };
            position: absolute;
            left: -13px; top: 0;bottom: 0; margin: auto;
        }
    }

    b { font-weight: 500; letter-spacing: 0; }

    &::after {
        content: "";
        display: block;
        width: 0px;
        height: 0px;
        position: absolute;
        top: 0; left: -10px; bottom: 0; margin: auto;
        border-top: 6px solid transparent;
        border-bottom: 6px solid transparent;
        border-right: 10px solid rgba(0,0,0, .7);
    }
`;

export const PopupMain = styled.div`
    visibility: hidden;
    width: 410px;
    font-family: "Noto Sans KR", sans-serif;
    text-align: center;
    color: ${ ({theme}) => theme.colors.commonBlack };
    box-shadow: ${ ({theme}) => theme.boxShadow.default };
    border-radius: 5px;
    z-index: 10;
    background-color: ${ ({theme}) => theme.colors.realWhite };
    padding-top: 40px;
    position: fixed;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    word-break: keep-all;

    .btn-close {
        width: 40px; height: 40px;
        position: absolute; top: 7px; right: 5px;
        svg { width: 70%; height: 70%; }
    }

    ${ props => props.type === "BTL_REQ_RECV" && css`
        .input-wrapper {
            visibility: ${ props => props.visible ? "visible" : "hidden"};
            height: ${ props => props.visible ? "40px" : 0 };
            padding: 0 20px;
            margin-top: 14px;
            overflow: hidden;
            transition: all .2s ease;

            input[type=text] {
                width: 100%;
                height: 100%;
                border: 1px solid ${ props => props.theme.colors.border };
                font-size: 1rem;
                text-indent: 14px;
                border-radius: 5px;
                &::placeholder { color: #D9D9D9; }
            }
        }
    `}

    h4 {
        font-size: 22px;
        font-weight: 400;
        line-height: 32px;
        padding: 0 18px;
    }
    b { font-weight: 700; }
    .main-msg {
        padding: 0 20px;
        .msg { font-size: 26px; font-weight: 800; }
    }
    .sub-msg { font-size: 18px; line-height: 28px; }
    .quotes-up {
        margin-top: 14px;
        
        svg { width: 20px; height: auto; }
    }
    .quotes-dwn {
        margin-bottom: 14px;
        
        svg { width: 20px; height: auto; } 
    }
    .btn-wrapper {
        padding: 40px 24px 23px; 
        display: flex; 
        justify-content: space-between
    }
`;

export const Background = styled.div`
    visibility: ${ props => props.active ? "visible" : "hidden" };
    opacity: ${ props => props.active ? 1 : 0 };
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0; left: 0;
    background-color: rgba(0,0,0,.8);
    transition: .3s;
    z-index: 10;
`;

export const NoticeStyle = styled.div`
    visibility: ${ props => props.notice ? "visible" : "hidden" };
    opacity: ${ props => props.notice ? 1 : 0 };
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    position: absolute;
    top: 0; left: 0;
    border-radius: 5px;
    transition: opacity .1s ease-out;
    z-index: 5;

    .inner-box {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 60%;
        padding: 15px 20px;
        background-color: ${ props => props.theme.colors.realWhite };
        box-shadow: ${ props => props.theme.boxShadow.default };
        text-align: center;
        font-family: "Noto Sans KR", sans-serif;
        position: relative;
        border-radius: 5px;
        position: absolute;
        top: 50%; left: 50%; transform: translate(-50%, -50%);
        z-index: 7px;
        visibility: ${ props => props.notice ? "visible" : "hidden" };
        opacity: ${ props => props.notice ? 1 : 0 };
        transition: .1s ease;
        transition-delay: .1s;

    }

    b.strong { font-weight: 700; }
    .main-text { font-size: 1rem; color: ${ props => props.theme.colors.commonBlack }; line-height: 20px; }
    .timer { font-family: "Montserrat", sans-serif; font-size: 12px; font-weight: 300; color: #A4A4A4; position: absolute; right: 10px; bottom: 10px; }
`;