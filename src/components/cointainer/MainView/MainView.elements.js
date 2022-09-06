import styled from "styled-components";

export const Wrapper = styled.div`
    &.main-view {
        width: 472px;
        padding: 21px 15px 20px;
        background-color: ${ ({theme}) => theme.colors.realWhite };
        border-radius: 5px;
        position: relative;
        box-shadow: ${ props => props.theme.boxShadow.default };
    }
    &.edit-wrapper, &.select-wrapper {
        /* display: flex; */
        display: ${ props => props.active ? "flex" : "none" };
        align-items: center;
        padding: 0 15px;
        height: 74px;
        
        button {
            margin-right: 12px;
        }
        .input-wrapper { width: 100%; }
    }
    &.edit-wrapper {
        
    }
    &.body {
        display: flex;
        justify-content: space-between;
        padding-top: 43px;
    }
    &.stat-wrapper {
        width: calc(100% - (232px + 5px));
        padding: 0 11px;
        text-align: right;

        .total-points {
            display: block;
            width: 100%;
            height: 25px;
            line-height: 20px;
            font-size: 18px;
            font-weight: 700;
            text-align: center;
            border-radius: 5px;
            margin-right: 11px;
            color: ${ props => props.remain ? props.theme.colors.lightRed : props.theme.colors.inActiveInputTxt };
            border: 1px solid ${ props => props.remain ? props.theme.colors.border : props.theme.colors.inActive };
            background-color: ${ props => props.remain ? props.theme.colors.realWhite : props.theme.colors.inActiveInputBG };;
        }
    }
    &.list-wrapper {
        padding: 15px 0 0;

        li:not(:last-child) { margin-bottom: 15px; }

        .btn-wrapper {
            display: flex;
            
            button:first-child { margin-right: 6px; }
        }
        li:first-child .heading { position: relative; }
        li:first-child .heading::after {
            content: "";
            display: block;
            width: 14px;
            height: 14px;
            background: url("./icon/info.png") no-repeat center /contain;
            position: absolute;
            top: 0; right: -2px; bottom: 0; margin: auto;
        }
    }
    &.view-wrapper { width: 232px; position: relative; }
    &.custom-wrapper { 
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    &.btn-handlers {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
    }
    &.text-wrapper {
        font-family: "Montserrat", sans-serif;
        color: ${ ({theme}) => theme.colors.commonBlack };
        font-weight: 700;
        letter-spacing: -1px;
        position: absolute;
        right: 12px; bottom: 5px;

        .level {
            display: block;
            font-size: 48px;
            text-align: right;
            line-height: 59px;

            b { font-size: 28px; line-height: 1; }
        }
        .pref-rank {
            display: block;
            font-size: 18px;
            text-align: right;
            line-height: 1;
            font-weight: 700;
        }
    }
    &.view-box {
        width: 100%;
        position: relative;

        .loading { animation: spin 1.5s ease infinite; }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    }
    &.exp-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .outer {
            width: 100%;
            /* height: 8px; */
            border: 1px solid #DEDEDE;
            border-radius: 15px;
            background-color: ${ ({theme}) => theme.colors.realWhite };
            padding: 3px;
            
            .inner {
                width: 0%;
                height: 10px;
                background-color: ${ ({theme}) => theme.colors.lightBlue };
                border-radius: 15px;
                transition: all 1s ease;

                &.active {
                    width: ${ props => props.exp ? `${props.exp}%` : "0%" };
                }
            }
        }
    }
    &.ability-btns {
        position: absolute;
        left: -55px; top: 140px;

        button:not(:last-child) { margin-bottom: 7px; }
    }
    &.story-box {
        visibility: hidden;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .7);
        backdrop-filter: blur(3px);
        color: ${ ({ theme }) => theme.colors.realWhite };
        position: absolute; left: 0; top: 0;
        border-radius: 5px;

        h4 { width: 95%; font-size: 18px; font-weight: 700; line-height: 22px; text-align: center;padding: 37px 0 70px;margin: auto; }
        p { display: block; width: calc(100% - 20px); text-align: center; font-size: 16px; font-weight: 200; line-height: 24px; padding: 0 10px; }
    }
`;

export const StatItem = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    span {
        display: block;
        font-size: 18px;
        font-weight: 700;
    }
`;

export const StatHeading = styled.span`
    width: 51px;
    text-align: left;
    font-family: "Montserrat", sans-serif;
    color: ${ props =>  props.imgLoaded ? props.theme.colors.commonBlack : props.theme.colors.inActive };
    line-height: 24px;
    position: relative;
    cursor: pointer;
    transition: .2s;
`;
export const StatPoints = styled.span`
    text-align: center;
    letter-spacing: -1px;
    width: 56px;
    height: 24px;
    line-height: 20px;
    border-radius: 5px;
    border: 1px solid ${ props => props.theme.colors.border02 };
    color: ${ props => props.imgLoaded ? props.theme.colors.commonBlack2 : props.theme.colors.inActiveInputTxt };
    background-color: ${ props => props.remain ? props.theme.colors.realWhite : props.theme.colors.inActiveInputBG };
    transition: .2s;
`;

export const BookMark = styled.div`
    width: 30px;
    height: 40px;
    position: absolute;
    top: 0; left: 0;

    svg, i {
        color: rgba(102, 78, 255, 0.6);
        width: 100%;
        height: 100%;
    }

    span.group-no {
        width: 100%;
        font-family: "Montserrat", sans-serif;
        font-size: 18px;
        font-weight: 700;
        text-align: center;
        color: ${ ({theme}) => theme.colors.realWhite };
        position: absolute;
        top: 0; left: 0; margin-top: 6px;
    }
`;

export const CardImg = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 262px;

    img {
        max-height: 100%;
        &.loading-img {
            animation: loading 1.5s ease infinite;
            @keyframes loading {
                0% { transform: rotate(0) }
                100% { transform: rotate(360deg) }
            }
        }
    };
    .stand-by { font-size: 14px; color: ${ ({theme}) => theme.colors.commonBlack } };


`;