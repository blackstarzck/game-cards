import styled from "styled-components";

export const DescriptionSpan = styled.span`
    display: block;
    font-size: 16px;
    font-weight: 400;
    line-height: 1;
    color: ${ ({ theme }) => theme.colors.commonBlack };
`;

export const DescriptionLi = styled.li`
    display: block;
    font-size: 16px;
    font-weight: 400;
    line-height: 1;
    color: ${ ({ theme }) => theme.colors.commonBlack };
`;

export const TitleDefault = styled.h2`

`;

export const CardMainTitle = styled.h3`
    font-size: 34px;
    font-weight: 900;
    line-height: 44px;
    letter-spacing: -1.5px;
    color: ${ props =>  props.imgLoaded ? props.theme.colors.realBlack : props.theme.colors.inActive };
    /* overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%; */
`;

export const CardSubTitle = styled.h4`
    font-family: 'Inter', sans-serif;
    font-size: 24px;
    font-weight: 400;
    line-height: 30px;
    letter-spacing: -1.5px;
    color: ${ props =>  props.imgLoaded ? props.theme.colors.realBlack : props.theme.colors.inActive };
`;

export const SectionTitle = styled.h3`
    font-family: "Noto Sans KR", sans-serif;
    font-size: 34px;
    font-weight: 800;
    line-height: 46px;
    letter-spacing: -1px;
    color: ${ ({theme}) => theme.colors.commonBlack };

    img { vertical-align: inherit;margin-right: 10px; }
`;

export const FrdSectionHeading = styled(SectionTitle)`
    font-size: 20px;
    svg, i { margin-right: 8px; };
`;