import styled from "styled-components";

export const CardContainer = styled.li`
    /* width: calc(100% / 4); */
    width: 277px;
    height: 390px;
    background-color: ${ props => props.theme.colors.realWhite };
    border-radius: 5px;
    box-shadow: ${ props => props.theme.boxShadow.default };

    @media screen and (max-width: 1200px){
        & { width: 100%; }
    }
    @media screen and (max-width: 900px){
        li { grid-template-columns: repeat(2, 1fr); }
    }
    @media screen and (max-width: 600px){
        li { grid-template-columns: repeat(1, 1fr); }
    }
`;

export const ViewStyle = styled.div`
    color: ${ props => props.theme.colors.realWhite };
    padding: 10px 10px 16px;

    .main-view {
        position: relative;
        height: 237px;
        overflow: hidden;
    };
    .group-select-wrapper {
        width: 64px;
        font-family: "Montserrat", sans-serif;
        position: absolute;
        top: 10px; left: 10px;
    }
    .group-no {
        width: 100%;
        height: 25px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;
        line-height: 25px;
        font-size: 14px;
        font-weight: 400;
        background-color: rgba(0, 0, 0, .5);
        border: 1px solid ${ props => props.theme.colors.commonBlack };
        border-radius: 5px;
        cursor: pointer;

        svg, i { font-size: 12px; }

        .group-numb { width: 10px; text-align: center; }
    }
    .group-select-box {
        width: 100%;
        background-color: rgba(0, 0, 0, .5);
        border: 1px solid ${ props => props.theme.colors.commonBlack };
        border-radius: 5px;
        position: absolute;
        left: 0; top: 0;

        .group-numb {

            text-align: center;
            line-height: 24px;
            cursor: pointer;

            &:hover { background-color: rgba(0, 0, 0, .8); };
        };
    }

    .img-box {
        width: 100%;
        height: 100%;
        /* height: 237px; */
        background-color: ${ props => props.theme.colors.inActiveInputTxt };
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
            opacity: 0;
            vertical-align: top;
            max-height: 80%;
            animation: show .5s ease;
            animation-fill-mode: forwards;
        }
        .loading { animation: rotation 1s linear; }
        
        svg { font-size: 28px; }

        @keyframes show {
            0% { opacity: 0 }
            100% { opacity: 1}
        }
        @keyframes rotation {
            0% { transform: rotate(0) }
            25% { transform: rotate(90deg)}
            50% { transform: rotate(180deg) }
            75% { transform: rotate(270deg)}
            100% { transform: rotate(360deg) }
        }
    }

    .card-details-wrapper {
        width: 100%;
        font-family: "Montserrat", sans-serif;
        background-color: rgba(0, 0, 0, .7);
        border-radius: 5px;
        position: absolute;
        left: 0; top: 0;
        border-radius: 5px;

        .point.active { color: #AF2CFF }
        
        .inner {
            width: 100%;
            height: 237px;
            overflow-y: auto;
            &::-webkit-scrollbar { width: 10px; }
            &::-webkit-scrollbar-thumb { 
                border-radius: 10px;
                background-clip: padding-box;
                border: 2px solid transparent;
                background-color: ${({theme}) => theme.colors.border};
            }
            &::-webkit-scrollbar-track {}
        }

        .left {
            font-size: 1rem;
            line-height: 20px;
            font-weight: 400;
            li {
                width: 75px;
                display: flex;
                justify-content: space-between;
            }
            li:not(:last-child) { margin-bottom: 9px; }
        }
        .right {
            flex: 1;
            .text { display: block; width: 100%;font-family: "Noto Sans KR", sans-serif; font-size: 1rem; font-weight: 500; text-align: center; }
            .pref-rank { display: block; width: 100%; font-size: 106px; text-align: center; font-weight: 700; line-height: 100px; }
        }
        .bottom {
            padding: 0 16px 16px 16px;
            font-family: "Noto Sans KR", sans-serif;
            text-align: center;

            span.quote { display: block; width: 100%; font-size: 18px; font-weight: 500; border-top: 1px solid #ffffff; padding-top: 20px; };
            p.descr { width: 100%; font-size: 14px; font-weight: 300; line-height: 22px; color: #d7d7d7; word-break: break-all; margin-top: 20px; }
        }
    }
`;

export const TextStyle = styled.div`
    font-family: 'Montserrat', sans-serif;
    color: ${ props => props.theme.colors.commonBlack };
    padding: 0 10px 18px;

    .text-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .nick-name {
            font-family: 'Noto Sans KR', sans-serif;
            width: 180px;
            display: block;
            font-size: 24px;
            font-weight: 800;
            line-height: 30px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis; 
        };
        .job-name {
            width: 180px;
            display: block;
            font-size: 18px;
            font-weight: 400;
            line-height: 22px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis; 
        };
        .name-wrapper {
            width: 180px;


        }
        .level-wrapper {
            b { font-size: 16px };
            span { font-size: 22px; font-weight: 700; };
        };
        .title {
            width: 100%;
            text-align: center;
            font-size: 18px;
            line-height: 52px;
            font-weight: 700;

            &.loading { color: #C7C7C7; }
        }
    };
`;

export const ButtonWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
`;