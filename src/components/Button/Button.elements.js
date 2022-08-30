import styled from "styled-components";

export const DefaultButton = styled.button`
    border-radius: 5px;
    box-shadow: ${ ({ theme }) => theme.boxShadow.default };
`;

export const ScrollUpButton = styled.button`
    position: fixed;
    right: 20px;
    bottom: 100px;
    width: 70px;
    height: 70px;
    background-color: ${ props => props.theme.colors.realWhite };
    border-radius: 50%;
    box-shadow: ${ props => props.theme.boxShadow.default };
    z-index: 4;

    svg { width: 60%; height: 60% }
`;

export const UploadButton = styled(DefaultButton)`
    width: 248px;
    height: 75px;
    background: ${ ({ theme }) => theme.colors.primaryColor };

    label {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        font-size: 24px;
        font-weight: 500;
        line-height: 75px;
        color: ${ ({ theme }) => theme.colors.realWhite };
        cursor: pointer;
        
        svg, i { width: 26px; height: auto; margin-left: 26px; }
    }
`;

export const RecruitButton = styled(DefaultButton)`
    font-size: 20px;
    font-weight: 500;
    color: ${ (props) => props.select === "NEW" ? props.theme.colors.realWhite : props.theme.colors.lightBlack };
    background-color: ${ (props) => props.select === "NEW" ? props.theme.colors.lightRed : props.theme.colors.realWhite };
    width: 114px;
    height: 46px;
    line-height: 46px;
    transition: .2s;

    & > svg, i {
        margin-left: 5px;
    }
`;

export const GetButton = styled(DefaultButton)`
    font-size: 20px;
    font-weight: 500;
    color: ${ (props) => props.select == "PREV" ? props.theme.colors.realWhite : props.theme.colors.lightBlack };
    background-color: ${ (props) => props.select == "PREV" ? props.theme.colors.lightRed : props.theme.colors.realWhite };
    width: 114px;
    height: 46px;
    line-height: 46px;
    transition: .2s;

    & > svg, i {
        margin-left: 5px;
    }
`;

export const EditTitleButton = styled.button`
    width: 35px;
    height: 35px;
    color: ${ props =>  props.imgLoaded ? props.theme.colors.commonBlack : props.theme.colors.inActive };
    transition: .2s;

    & svg, i {
        width: 100%;
        height: 100%;
    }
`;

export const SaveTitleButton = styled.button`
    width: 38px;
    height: 38px;

    & svg, i {
        width: 100%;
        height: 100%;
    }
`;

export const ClearButton = styled.button`
    width: 22px;
    height: 22px;
    position: absolute;
    top: 0;right: 0;bottom: 0;margin: auto;

    & svg, i {
        color: #E2E2E2;
        width: 100%;
        height: 100%;
    }
`;

export const ArrowDownButton = styled(ClearButton)`
    & svg, i {
        color: ${ ({ theme }) => theme.colors.commonBlack };
        width: 100%;
        height: 100%;
    }
`;

export const AddButton = styled.button`
    width: 24px;
    height: 24px;
    border: 1px solid ${ ({ theme }) => theme.colors.border02 };
    border-radius: 5px;

    & svg, i {
        color: ${ ({ theme }) => theme.colors.lightBlue };
        width: 80%;
        height: 80%;
    }
`;

export const RemoveButton = styled(AddButton)`

`;

export const ResetButton = styled.button`
    width: 95px;
    height: 40px;
    background-color: ${ props => props.imgLoaded ? props.theme.colors.realRed : props.theme.colors.inActiveButtonBg };
    border-radius: 25px;
    box-shadow: ${ ({ theme }) => theme.boxShadow.default };
    transition: .2s;

    & svg, i {
        color: ${ ({ theme }) => theme.colors.realWhite };
        width: 20px;
        height: 20px;
    }
`;

export const SaveButton = styled(ResetButton)`
    & svg, i {
        width: 25px;
        height: 25px;
    }
`;
export const ViewButton = styled.button`
    width: 110px;
    height: 40px;
    font-size: 18px;
    font-weight: 400;
    border-radius: 25px;
    color: ${ ({ theme }) => theme.colors.realWhite };
    background: ${ props => props.imgLoaded ? props.theme.colors.primaryColor : props.theme.colors.inActiveButtonBg };
    box-shadow: ${ ({ theme }) => theme.boxShadow.default };
    transition: .2s;
`;
export const KeepButton = styled(ViewButton)`
    width: 110px;
`;

export const LevelUpButton = styled.button`
    width: 25px;
    height: 25px;
    color: ${ props =>  props.imgLoaded ? props.theme.colors.realRed : props.theme.colors.inActiveButtonBg };
    transition: .2s;

    svg, i {
        width: 100%;
        height: 100%;
    }
`;

export const StatButton = styled.button`
    width: 55px;
    height: 100px;
    font-size: 18px;
    line-height: 22px;
    font-weight: 700;
    color: ${ props =>  props.imgLoaded ? props.theme.colors.commonBlack : props.theme.colors.inActiveButtonBg };
    background-color: ${ ({ theme }) => theme.colors.realWhite };;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    transition: .2s;

    b { display: block; width: 100%; text-align: center;}
    svg, i {
        position: absolute;
        right: 0; top: 6px;
        color: ${ ({ theme }) => theme.colors.realRed };
    }
`;

export const SkillButton = styled(StatButton)`
    color: ${ props => props.disable && props.theme.colors.inActive };
`;

export const SearchButton = styled.button`
    width: 38px;
    height: 38px;
    position: absolute;
    top: 0; right: 0;
    color: ${ (props) => props.login ? props.theme.colors.commonBlack : props.theme.colors.border};

    svg, i {
        width: 55%;
        height: auto;
    }
`;

export const YesButton = styled.button`
    width: calc((100% / 2) - 12px);
    height: 50px;
    font-size: 18px;
    line-height: 50px;
    font-weight: 400;
    color: ${ ({theme}) => theme.colors.realWhite };
    background: ${ ({theme}) => theme.colors.primaryColor};
    border-radius: 35px;
    box-shadow: ${ ({theme}) => theme.boxShadow.default };
`;

export const NoButton = styled(YesButton)`

`;

export const LoginButton = styled.button`
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    font-weight: 500;
    color: ${ props => props.theme.colors.realWhite };
    border-radius: 5px;
    background: ${ props => props.theme.colors.primaryColor };
`;

export const GoogleButton = styled.button`
    width: 50px;
    height: 50px;
    background-image: url("./images/btn-google.png");
`;
export const KakaoButton = styled(GoogleButton)`
    background-image: url("./images/btn-kakao.png");
`;
export const NaverButton = styled(GoogleButton)`
    background-image: url("./images/btn-naver.png");
`;

export const EyeOpenButton = styled.button`
    width: 100%; height: 100%;
    display: ${props => props.eyeOpen ? "none" : "flex" };
    justify-content: center;
    align-items: center;
`;

export const EyeCloseButton = styled(EyeOpenButton)`
    display: ${props => props.eyeOpen ? "flex" : "none" };
`;

export const SignButton = styled.button`
    width: 235px;
    height: 50px;
    text-align: center;
    font-size: 20px;
    font-weight: 500px;
    line-height: 45px;
    color: ${ props => props.theme.colors.realWhite };
    background: ${ props => props.theme.colors.primaryColor };
    border-radius: 5px;
`;

export const InfoButton = styled.button`
    width: 70px;
    height: 40px;
    line-height: 40px;
    font-size: 1.2rem;
    text-align: center;
    background: ${ props => props.theme.colors.primaryColor };
    color: ${ props => props.theme.colors.realWhite };
    border-radius: 25px;
    box-shadow: ${ props => props.theme.boxShadow.default };
`;

export const DeleteButton = styled(InfoButton)``;

export const SelectCardButton = styled.button`
    width: 77px;
    height: 40px;
    line-height: 40px;
    font-family: "Inter", sans-serif;
    font-size: 18px;
    font-weight: 400;
    text-align: center;
    background-color: ${ props => props.theme.colors.realRed };
    color: ${ props => props.theme.colors.realWhite };
    border-radius: 25px;
    box-shadow: ${ props => props.theme.boxShadow.default };
`;

export const BattleButton = styled.button`
    width: 100%;
    font-size: 20px;
    font-weight: 700;
    line-height: 56px;
    text-align: center;
    color: ${ props => props.theme.colors.realWhite };
    background: ${ props => props.active ? props.theme.colors.primaryColor : props.theme.colors.inActive };
    border-radius: 5px;
    box-shadow: ${ props => props.theme.boxShadow.default };
`;