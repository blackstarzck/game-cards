import styled from "styled-components";

export const DefaultButton = styled.button`
    border-radius: 5px;
    box-shadow: ${ ({ theme }) => theme.boxShadow.default };
`;

export const UploadButton = styled(DefaultButton)`
    font-size: 24px;
    font-weight: 500;
    line-height: 75px;
    color: ${ ({ theme }) => theme.colors.realWhite };
    width: 248px;
    height: 75px;
    background: ${ ({ theme }) => theme.colors.primaryColor };
    
    & > svg, i {
        margin-left: 26px;
    }
`;

export const RecruitButton = styled(DefaultButton)`
    font-size: 20px;
    font-weight: 500;
    color: ${ (prop) => prop.defChecked ? prop.theme.colors.realWhite : prop.theme.colors.lightBlack };
    background: ${ (prop) => prop.defChecked ? prop.theme.colors.lightRed : prop.theme.colors.realWhit };
    width: 114px;
    height: 46px;
    line-height: 46px;

    & > svg, i {
        margin-left: 5px;
    }
`;

export const LevelUpButton = styled(RecruitButton)`
    font-size: 20px;
    font-weight: 500;
    color: ${ (prop) => prop.defChecked ? prop.theme.colors.realWhite : prop.theme.colors.lightBlack };
    background: ${ (prop) => prop.defChecked ? prop.theme.colors.lightRed : prop.theme.colors.realWhit };
    width: 114px;
    height: 46px;
    line-height: 46px;

    & > svg, i {
        margin-left: 5px;
    }
`;

export const EditTitleButton = styled.button`
    width: 35px;
    height: 35px;

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