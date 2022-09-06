import styled, { css } from "styled-components";

export const FrdListSection = styled.section`
    max-width: ${ props => props.theme.size.desktop };
    margin: 147px auto 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    @media screen and (max-width: 1200px){
        margin: 0 25px;
        article { width: 100%; margin-top: 110px; }
    }
    @media screen and (max-width: 610px){
        article:first-child h3 { margin: 0 auto 15px; }
        article:first-child .heading { display: none; }
        article:first-child .input-wrapper { width: 100%; margin: 0 auto; }
        article:first-child input { width: 100%; border-top-left-radius: 25px; border-bottom-left-radius: 25px; border: 1px solid #D9D9D9; border-right: 0; }

        article:last-child .top { display: block; }
        article:last-child h3 { text-align: center; margin-bottom: 15px; }
        article:last-child .result-wrap { text-align: center; }
    }

    h3.title {
        font-size: 34px;
        line-height: 46px;
        font-weight: 800;
        letter-spacing: -1px;
        svg { margin-right: 10px; }
    }
    
    .outer {
        height: 180px;
        overflow-y: auto;
        padding-top: 13px;
        &::-webkit-scrollbar { width: 10px; }
        &::-webkit-scrollbar-thumb { 
            border-radius: 10px;
            background-clip: padding-box;
            border: 2px solid transparent;
            background-color: ${({theme}) => theme.colors.border};
        }
        &::-webkit-scrollbar-track {}
    }
`;

export const Content = styled.article`
    padding: 20px 10px;
    background-color: ${ props => props.theme.colors.realWhite };
    border-radius: 5px;
    box-shadow: ${ props => props.theme.boxShadow.default };
    
    & > .top {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        padding: 0 5px 14px;
        border-bottom: 1px solid ${ props => props.theme.colors.border };
    }
    & > .body {
        width: 100%;
        margin-top: 10px;
        position: relative;
    }
`;

export const FrdListStyles = styled(Content)`
    width: 585px;
    /* width: calc((100% / 2) - 15px); */
    height: 340px;
    position: relative;

    .input-wrapper {
        display: flex;

        .heading {
            font-size: 1rem;
            line-height: 38px;
            height: 40px;
            font-weight: 500;
            border: 1px solid ${ props => props.theme.colors.border };
            border-top-left-radius: 25px;
            border-bottom-left-radius: 25px;
            border-right: 0;
            padding: 0 15px;
            position: relative;

            &::after {
                content: "";
                display: block;
                position: absolute;
                top: 0; right: 0; bottom: 0; margin: auto;
                width: 1px; height: 60%;
                background-color: ${ props => props.theme.colors.border };
                border-radius: 5px;
            }
        }
        input[type=text] {
            height: 40px;
            font-size: 1rem;
            color: ${ props => props.theme.colors.commonBlack };
            text-indent: 15px;
            border-top: 1px solid ${ props => props.theme.colors.border };
            border-bottom: 1px solid ${ props => props.theme.colors.border };
            
        }
        input[type=text]::placeholder { color: ${ props => props.theme.colors.border }; }
        .btn-txt-clear {
            width: 40px;
            height: 40px;
            border-top-right-radius: 25px;
            border-bottom-right-radius: 25px;
            border: 1px solid ${ props => props.theme.colors.border };
            border-left: 0;
            font-size: 18px;
            padding-right: 5px;
            color: #E2E2E2;
        }
    }
    .thead {
        width: 100%;
        display: flex;
        justify-content: space-between;
        /* padding-right: 12px; */

        .th {
            height: 40px;
            font-size: 20px;
            line-height: 40px;
            font-weight: 600;
            text-align: center;
            letter-spacing: -1px;
            svg { margin-left: 8px; }

            &:last-child svg { margin-left: 0; }

            &:nth-child(1){ width: 100px; }
            &:nth-child(2){ width: 80px; }
            &:nth-child(3){ width: 162px; }
            &:nth-child(4){ width: 92px; }
            /* &:nth-child(5){ width: 133px; }
            &:nth-child(6){ width: 92px; } */

            .btn-refresh {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                transition: all .2s ease;
                svg { width: 50%; height: 50%; }

                &:active {
                    background-color: rgba(0,0,0, .2);
                }
            }
        }
    }
    .tbody {
        width: 100%;
        display: flex;
        flex-direction: column;
        font-size: 1rem;
        padding-bottom: 24px;

        .standby {
            text-align: center;
            position: absolute;
            top: 55%; left:50%;
            transform: translate(-50%, -50%)
        }
    }
`;

export const RowStyles = styled.ul`
    display: flex;
    justify-content: space-between;
    align-items: center;
    &:not(:last-child) { margin-bottom: 10px; }

    .td {
        height: 30px;
        line-height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: ${ props => props.online ? "#444444" : "#BFBFBF" };

        &:nth-child(1){ width: 100px; }
        &:nth-child(2){ width: 80px; }
        &:nth-child(3){ width: 162px; }
        &:nth-child(4){ width: 92px; }
        /* &:nth-child(5){ width: 133px; }
        &:nth-child(6){ width: 92px; } */

        ${(props) => props.online ?
        css`
            .td { color: red };
            .onOff { border: 2px solid #BEFFD0;background-color: #00FF0A ;};
        ` :
        css`
            .td { color: #BFBFBF };
            .onOff { border: 2px solid #;background-color: #D8D8D8 ;};
        `}

        .onOff {
            width: 20px;
            height: 20px;
            margin: 0 auto;
            border-radius: 50%;
            border: 2px solid ${ props => props.online ? "#BEFFD0" : "#BEBEBE" };
            background-color: ${ props => props.online ? "#00FF0A" : "#D8D8D8" };
        }
        &.numb { font-family: "Montserrat", sans-serif; }
        &.frd-name {
            position: relative;
            ${ props => (props.receive  && props.online) && css`
                cursor: pointer;
                &::after {
                    ${ props => props.receive && css`
                        content: "";
                        display: block;
                        width: 20px;
                        height: 100%;
                        background: url("./icon/income-msg-2.png") no-repeat center / contain;
                        position: absolute;
                        top: -5px; right: -5px;
                        animation: gelatine 0.5s infinite;
                    `}
                }
                @keyframes gelatine {
                    from, to { transform: scale(1, 1); }
                    25% { transform: scale(0.9, 1.1); }
                    50% { transform: scale(1.1, 0.9); }
                    75% { transform: scale(0.95, 1.05); }
                }
            `}
        } 
        .selectBox {
            width: 100%;
            position: relative;
            
            select {
                width: 100%;
                height: 30px;
                font-family: "Noto Sans KR", sans-serif;
                font-size: 1rem;
                border: 1px solid ${ props => props.online ? props.theme.colors.commonBlack : "#BFBFBF" };
                border-radius: 5px;
                outline: none;
                padding-left: 15px;
                
            }
            .icon {
                width: 15px;
                height: 15px;
                position: absolute;
                top: 0; right: 15px; bottom: 0; margin: auto;
                svg { display: block }
            }
        }
        .btn-req {
            width: 100%;
            height: 100%;
            font-size: 20px;
            color: ${ props => props.online ? props.theme.colors.realWhite : "#A9A9A9"  };
            background: ${ props => props.online ? props.theme.colors.primaryColor : "#C7C7C7"};
            border-radius: 25px;
            box-shadow: ${ props => props.theme.boxShadow.default };
        }
    }
`;

export const SelectBoxStyles = styled.ul`
    width: ${ props => `${props.pos.width}px` };
    visibility: ${ props => props.pos.vis ? "visible" : "hidden" };
    height: ${ props => props.pos.vis ? `${props.height}px` : 0 };
    position: absolute;
    top: ${ props => props.pos.y && `${props.pos.y}px` };
    left: ${ props => props.pos.x && `${props.pos.x}px` };
    background-color: ${ props => props.theme.colors.realWhite };
    border: 1px solid ${ props => props.theme.colors.commonBlack };
    border-radius: 5px;
    z-index: 3;
    padding: 10px 0;
    transition: height .2s;
    overflow: hidden;
    box-shadow: ${ props => props.theme.boxShadow.default };

    .item {
        width: 100%;
        height: 30px;
        line-height: 30px;
        font-weight: 400;
        font-size: 16px;
        text-align: center;
        color: ${ props => props.theme.colors.commonBlack };
        cursor: pointer;

        &:hover {
            background-color: ${ props => props.theme.colors.highLight }
        }
    }
`;

export const ChatBoxStyles = styled.span`
    visibility: ${ props => props.visiblie ? "visible" : "hidden" };
    opacity: ${ props => props.visiblie ? 1 : 0 };
    display: block;
    width: 110px;
    height: 40px;
    font-size: 1rem;
    font-weight: 400;
    line-height: 40px;
    text-align: center;
    position: absolute;
    left: 50%; top: 50%; transform: translate(40%, -50%);
    border-radius: 5px;
    background-color: ${ props => props.theme.colors.realWhite };
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    z-index: 4;
    transition: all .15s;

    &:hover {
        color: ${ props => props.theme.colors.realWhite };
        background-color: rgba(0, 0, 0, .8);
    }

    svg { margin-left: 5px; }
`;

export const MessageBoxStyles = styled.div`
    visibility: hidden;
    width: 450px;
    font-family: "Noto Sans KR", sans-serif;
    /* background-color: rgba(0, 0, 0, .7); */
    background-color: rgba(102, 102, 102, .8);
    /* backdrop-filter: blur(2px); */
    border-radius: 5px;
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    z-index: 5;
    transition: .2s ease;

    .top {
        display: flex;
        justify-content: space-between;
        background-color: #232323;
        padding: 14px 10px;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        
        
        .title {
            font-size: 18px;
            line-height: 26px;
            font-weight: 300;
            color: ${ props => props.theme.colors.realWhite };
        }
        .btn-claose {
            width: 30px;
            height: 30px;
            color: ${ props => props.theme.colors.realWhite };
            svg { width: 100%; height: 100%; }
        }
    }
    .body {
        height: 330px;
        overflow-y: auto;
        padding: 10px 7px;
        color: ${ props => props.theme.colors.realWhite };
        font-size: 1rem;
        font-weight: 100;

        &::-webkit-scrollbar { width: 10px; }
        &::-webkit-scrollbar-thumb { 
            border-radius: 10px;
            background-clip: padding-box;
            border: 2px solid transparent;
            background-color: ${({theme}) => theme.colors.border};
        }
        &::-webkit-scrollbar-track {}
        
        .msg-item:not(:last-child) { margin-bottom: 9px; }

        .myMsg, .yourMsg {
            /* max-width: 380px; */
            display: flex;
            align-items: center;

            .text-area {
                display: inline-block;
                background-color: rgba(0, 0, 0, .5);
                padding: 10px;
                border-radius: 5px;
            }
            .time {
                font-size: 12px;
                line-height: 14px;
                font-weight: 100;
                margin-left: 5px;
            }
        }
        
        .yourMsg {
            flex-direction: row-reverse;

            .text-area { background-color: rgba(6, 103, 15, .5); }
            .time { text-align: right; margin-right: 5px; }
        }
    }
    .bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #232323;
        padding: 10px;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;

        input[type=text] {
            width: 80%;
            font-size: 1rem;
            height: 25px;
            line-height: 25px;
            font-weight: 300;
            background-color: transparent;
            color: ${ props => props.theme.colors.realWhite };
        }
        input[type=text]::placeholder {  color: #929292 }

        .btn-submit {
            width:  63px;
            height: 35px;
            line-height: 35px;
            font-size: 1rem;
            color: ${ props => props.theme.colors.realWhite };
            background-color: #007628;
            border-radius: 25px;
        }
    }
`;

export const StatisticsStyles = styled(Content)`
    width: 585px;
    /* width: calc((100% / 2) - 15px); */
    height: 340px;

    .tbody {
        overflow: hidden;
        padding-bottom: 24px;
    } 

    .victory {
        font-size: 22px;
        font-weight: 600;
        margin-right: 14px;

        b.numb {
            font-family: "Montserrat", sans-serif;
            font-size: 32px;
            font-weight: 700;
            color: #9E00FF;
        }
    }
    .defeat {
        font-size: 22px;
        font-weight: 600;
        b.numb {
            font-family: "Montserrat", sans-serif;
            font-size: 32px;
            font-weight: 700;
            color: #FF3333;
        }
    }
    
    .thead {
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding-right: 5px;

        .th {
            height: 40px;
            font-size: 20px;
            line-height: 40px;
            font-weight: 600;
            letter-spacing: -1px;
            text-align: center;

            &:nth-child(1){ width: 110px; }
            &:nth-child(2){ width: 110px; }
            &:nth-child(3){ width: 75px; }
            &:nth-child(4){ width: 135px; }
        }
    }
`;

export const StaticRowStyles = styled.ul`
    width: 100%;
    display: flex;
    justify-content: space-between;

    &:not(:last-child) { margin-bottom: 10px; }

    .td {
        height: 30x;
        line-height: 30px;
        font-size: 1rem;
        text-align: center;

        &.result-victory { font-weight: 700; color: #7000FF; }
        &.result-defeat { font-weight: 700; color: #FF3333; }
        &.result-draw { font-weight: 700; color: #8A8A8A; }

        &.date { font-family: "Montserrat", sans-serif }
        &.opponent {
            position: relative;
            span {
                ${ props => props.comment && css`
                cursor: pointer;

                &::after {
                    content: "";
                    display: block;
                    width: 20px;
                    height: 100%;
                    background: url("./icon/cmmt.png") no-repeat center / contain;
                    position: absolute;
                    top: -5px; right: 10px;
                    animation: gelatine 0.5s infinite;

                    @keyframes gelatine {
                        from, to { transform: scale(1, 1); }
                        25% { transform: scale(0.9, 1.1); }
                        50% { transform: scale(1.1, 0.9); }
                        75% { transform: scale(0.95, 1.05); }
                    }
                }
            `}
            }
        }

        &:nth-child(1){ width: 110px; }
        &:nth-child(2){ width: 110px; }
        &:nth-child(3){ width: 75px; }
        &:nth-child(4){ width: 135px; }
    }
`;