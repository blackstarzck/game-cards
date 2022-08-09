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
    line-height: 41px;
    letter-spacing: -1.5px;
    color: ${ ({ theme }) => theme.colors.realBlack };
`;

export const CardSubTitle = styled.h4`
    font-family: 'Inter', sans-serif;
    font-size: 24px;
    font-weight: 400;
    line-height: 29px;
    letter-spacing: -1.5px;
    color: ${ ({ theme }) => theme.colors.realBlack }
`;