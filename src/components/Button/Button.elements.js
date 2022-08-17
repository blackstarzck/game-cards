import styled from "styled-components";

export const DefaultButton = styled.button`
    border-radius: 5px;
    box-shadow: ${ ({ theme }) => theme.boxShadow.default };
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
    color: ${ (prop) => prop.state == "active" ? prop.theme.colors.realWhite : prop.theme.colors.lightBlack };
    background-color: ${ (prop) => prop.state == "active" ? prop.theme.colors.lightRed : prop.theme.colors.realWhite };
    width: 114px;
    height: 46px;
    line-height: 46px;
    transition: .2s;

    & > svg, i {
        margin-left: 5px;
    }
`;

export const GetButton = styled(RecruitButton)`

`;

export const EditTitleButton = styled.button`
    width: 35px;
    height: 35px;
    color: ${ props =>  props.imgLoaded ? props.theme.colors.commonBlack : props.theme.colors.inActive };

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
`;
export const KeepButton = styled(ViewButton)`
    width: 110px;
`;

export const LevelUpButton = styled.button`
    width: 25px;
    height: 25px;

    svg, i {
        color: ${ ({ theme }) => theme.colors.inActiveButtonBg };
        /* color: ${ ({ theme }) => theme.colors.realRed }; // active */
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