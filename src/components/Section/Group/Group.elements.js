import styled, { css } from "styled-components";

export const GroupSection = styled.section`
    max-width: ${ props => props.theme.size.desktop };
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    height: 330px;
    margin-top: 187px;

    .btn-prev, .btn-next, .group-no { color: ${ props => props.login ? props.theme.colors.commonBlack : props.theme.colors.inActiveButtonBg } }
`;

export const ViewContainerStyles = styled.article`
    width: 687px;
    height: 100%;
    display: flex;
    align-items: center;

    .mySwiper { width: 100%; height: 100%; }

    .btns-wrapper {
        display: flex;
        flex-direction: column;
        margin-right: 20px;
    }
    .btn-prev {
        width: 50px;
        height: 50px; 
        border-radius: 50%;
        background-color: #ffffff;
        margin-bottom: 24px;
        svg { width: 50%; height: 50%;}
    }
    .btn-next {
        width: 50px;
        height: 50px; 
        border-radius: 50%;
        background-color: #ffffff;
        svg { width: 50%; height: 50%; }
    }
`;

export const ViewStyles = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 5px;
    position: relative;
    background-color: ${ props => props.theme.colors.realWhite };
    box-shadow: ${ props => props.theme.boxShadow.default };
    display: flex;
    align-items: center;

    .no-data {
        text-align: center;
        position: absolute;
        top: 50%; left: 50%;
        transform: translate(-50%, -50%);
        font-size: 15px;
    }
`;

export const GroupStyles = styled.ul`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: relative;
`;

export const CardStyles = styled.li`
    /* width: 160px; */
    width: calc((100% / 3) - 25px);
    height: 90%;
    color: ${ props => props.theme.colors.commonBlack };
    background-color: #EDEDED;
    border-radius: 5px;
    position: relative;
    overflow: hidden;
    ${ props => props.ready &&
        css`
            outline: 4px solid ${ props => props.theme.colors.purple }
    `};

    .btn-remove {
        width: 40px;
        height: 40px;
        position: absolute;
        top: 0; left: 0;
        
        svg { width: 60%; height: 60%; }
    }
    .img-box {
        width: 100%;
        height: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: all .2s ease;

        img { max-height: 80%; }
    }
    .nick-name {
        display: block;
        font-size: 18px;
        font-weight: 700;
        line-height: 26px;
    }
    .quote {
        display: block;
        width: 100%;
        font-size: 16px;
        line-height: 22px;
        font-weight: 400;

        &:first-child {}
        &:last-child {}
    }
    .level {
        display: block;
        font-family: "Montserrat", sans-serif;
        font-size: 22px;
        font-weight: 700;
        text-align: center;
        margin: 10px 0 10px;

        b { font-size: 16px; letter-spacing: -1px; }
    }
`;

export const DetailContainerStyles = styled.article`
    width: 387px;
    height: 100%;
    padding: 22px 22px 18px;
    border-radius: 5px;
    background-color: ${ props => props.theme.colors.realWhite };
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: ${ props => props.theme.boxShadow.default };
    position: relative;

    .pagenation {

        display: flex;
        position: absolute;
        top: -34px; left: 24px;

        .group-no {
            font-family: "Montserrat", sans-serif;
            width: 25px;
            height: 25px;
            line-height: 25px;
            font-size: 1rem;
            font-weight: 500;
            text-align: center;
            border-radius: 50%;
            background-color: ${ props => props.theme.colors.realWhite };
            margin: 0 5px;
            cursor: pointer;
            transition: all .2s ease;

            ${ props => props.login && css`
                &:hover {
                    background-color: ${ props => props.theme.colors.realBlack};
                    color: ${ props => props.theme.colors.realWhite };
                }
                &.active {
                    background-color: ${ props => props.theme.colors.realBlack};
                    color: ${ props => props.theme.colors.realWhite };
                }
            `}; 
        }
    }
    
    .stat-row {
        font-family: "Montserrat", sans-serif;
        font-size: 20px;
        display: flex;
        justify-content: space-between;
        &:not(:last-child){ margin-bottom: 18px; }
    }
    .stat {
        width: calc((100% / 2) - 20px);
        display: flex;
        justify-content: space-between;
    }

    .stat-name {
        font-weight: 700;
        color: ${ props => props.login ? "#555555" : props.theme.colors.inActiveButtonBg }
    }
    .stat-points{
        color: ${ props => props.login ? props.theme.colors.commonBlack : props.theme.colors.inActiveButtonBg }
    }

    .rank, .power {
        width: calc(100% / 2);
        font-family: "Montserrat";
        font-size: 42px;
        font-weight: 700;
        letter-spacing: -1px;
        text-align: center;
        color: ${ props => props.login ? props.theme.colors.commonBlack : props.theme.colors.inActive };
    
        svg { font-size: 34px; margin-right: 12px }
    }

    .data-box {
        display: flex;
        justify-content: space-between;
    }
`;