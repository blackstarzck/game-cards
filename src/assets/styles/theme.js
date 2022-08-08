// 컬러 시스템 정의
const colors = {
    lightBlack: "#666666",
    commonBlack: "#444444",

    // 메인 컬러1
    primaryColor: `linear-gradient(to right, rgba(0, 133, 255, 0.6), #9671FF);`,

    // 메인 컬러2 
    realWhite: "#FFFFFF",
    lightRed: "#FF6060",
    realRed: "#FF3333",

    // 1회성 텍스트 컬러
    purple: "#9E00FF",
    border: "#D9D9D9",
    lightBlue: "#rgba(0, 133, 255, 0.6)",

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

const theme = {
    colors, size, buttons
}

export default theme