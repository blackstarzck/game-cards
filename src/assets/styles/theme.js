import styled, { css } from "styled-components"

// 컬러 시스템 정의
const colors = {
    lightBlack: "#666666",
    commonBlack: "#444444",
    commonBlack02: "#5F5F5F",
    realBlack: "#000000",

    // 메인 컬러1
    primaryColor: "linear-gradient(to right, rgba(0, 133, 255, 0.6), #9671FF);",

    // 메인 컬러2 
    realWhite: "#FFFFFF",
    lightRed: "#FF6060", 
    realRed: "#FF3333",

    // 셀렉트박스 리스트 HOVER 컬러
    highLight: "rgba(150, 113, 255, 0.1)",

    // 1회성 텍스트 컬러
    purple: "#9E00FF",
    border: "#D9D9D9",
    border02: "#EFEFEF",
    lightBlue: "rgba(0, 133, 255, 0.6)",

    // 비활성화 버튼 배경
    inActiveButtonBg: "#E2E2E2",

    // 비활성화 인풋박스 배경
    inActiveInputBG: "#F5F5F5",
    inActiveInputTxt: "#EDEDED",

    // 검색 인풋박스 보더
    inputBorder: "#D9D9D9",
    inputPlaceHolder: "#E2E2E2",

    // 비활성화 글자
    inActive: "#C7C7C7",
}

// 디바이스 사이즈 정의
const size = {
    desktop : "1200px",
}

// 버튼 디자인
const buttons = {
    buttonRadiusSM: "5px",
    buttonRadiusLG: "5px",
}

// 버튼 음영
const boxShadow = {
    default: "2px 7px 10px 0 rgba(0, 0, 0, .1)"
}

// 레이아웃
const flexCenter = css`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const theme = {
    boxShadow,
    flexCenter,
    colors, size, buttons
}

export default theme