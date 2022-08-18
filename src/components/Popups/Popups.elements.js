import styled from "styled-components";
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
    width: 335px;
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

    h4 {
        font-size: 22px;
        font-weight: 400;
        line-height: 32px
    }
    b { font-weight: 800; }
    .btn-wrapper {
        padding: 23px 24px; 
        display: flex; 
        justify-content: space-between
    }
`;

export const Background = styled.div`
    visibility: ${ props => props.active ? "visible" : "hidden" };
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0; left: 0;
    background-color: rgba(0,0,0,.8);
    transition: .2s;
`;