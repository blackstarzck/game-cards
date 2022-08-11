import styled from "styled-components";
import theme from "../../../assets/styles/theme";

export const Wrapper = styled.div`
    &.edit-wrapper, &.select-wrapper {
        display: flex;
        align-items: center;
        padding-left: 15px;
        
        button {
            margin-right: 12px;
        }
    }
    &.body {
        display: flex;
        justify-content: space-between;
        padding-top: 43px;
    }
    &.stat-wrapper {
        width: calc(100% - (232px + 24px));
        text-align: right;

        .total-points {
            display: inline-block;
            width: 54px;
            height: 25px;
            font-size: 18px;
            font-weight: 700;
            text-align: center;
            border-radius: 5px;
            margin-right: 11px;
            color: ${ ({ theme }) => theme.colors.inActiveInputTxt };
            border: ${ ({ theme }) => theme.colors.inActive };
            background-color: ${ ({ theme }) => theme.colors.inActiveInputBG };;
            /* color: ${ ({ theme }) => theme.colors.inActive }; // active
            border: ${ ({ theme }) => theme.colors.inActive }; // active
            background-color: ${ ({ theme }) => theme.colors.realWhite }; // active */
        }
    }
    &.list-wrapper {
        padding: 15px 11px 0;

        li:not(:last-child) { margin-bottom: 15px; }

        .btn-wrapper {
            display: flex;
            
            button:first-child { margin-right: 6px; }
        }
    }
    &.view-wrapper { width: 232px; position: relative; }
    &.custom-wrapper {
        width: 100%;
        
        & > div:first-of-type { margin-bottom: 6px; }
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
    &.main-view {
        width: 452px;
        padding: 21px 15px 20px;
        background-color: ${ ({theme}) => theme.colors.realWhite };
        border-radius: 5px;
        position: relative;
    }
    &.view-box {
        width: 100%;
        position: relative;
    }
    &.exp-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .outer {
            width: 194px;
            height: 8px;
            border: 1px solid #DEDEDE;
            border-radius: 15px;
            background-color: ${ ({theme}) => theme.colors.realWhite };
            padding: 3px;
            
            .inner {
                width: 100%;
                height: 100%;
                background-color: ${ ({theme}) => theme.colors.lightBlue };
                border-radius: 15px;
                transition: all .2s ease;
            }
        }
    }
    &.ability-btns {
        position: absolute;
        left: -55px; top: 140px;

        button:not(:last-child) { margin-bottom: 7px; }
    }
    &.story-box {
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .7);
        backdrop-filter: blur(3px);
        color: ${ ({ theme }) => theme.colors.realWhite };
        position: absolute; left: 0; top: 0;
        border-radius: 5px;

        h4 { width: 100%; font-size: 18px; font-weight: 700; line-height: 22px; text-align: center;padding: 37px 0 70px; }
        p { display: block; width: calc(100% - 20px); font-size: 16px; font-weight: 200; line-height: 24px; padding: 0 10px; }
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
    span.heading {
        width: 51px;
        text-align: left;
        font-family: "Montserrat", sans-serif;
        color: ${ ({ theme }) => theme.colors.inActive };
        /* color: ${ ({ theme }) => theme.colors.commonBlack }; // active */
        line-height: 24px;
    }
    span.points {
        text-align: center;
        letter-spacing: -1px;
        width: 56px;
        height: 22px;
        line-height: 22px;
        border-radius: 5px;
        border: 1px solid ${ ({ theme }) => theme.colors.border02 };
        color: ${ ({ theme }) => theme.colors.inActiveInputTxt };
        /* color: ${ ({ theme }) => theme.colors.commonBlack02 }; // active */
        background-color: ${ ({ theme }) => theme.colors.inActiveInputBG };
    }
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
    img { width: 100%; }
`;