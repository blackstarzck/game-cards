import styled from "styled-components";

export const AlarmStyles = styled.div`
    position: fixed;
    right: 0; top: 50%;
    transform: translate(-20px, -50%);
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: ${ props => props.theme.colors.realWhite };
    box-shadow: ${ props => props.theme.boxShadow.default };
    transition: all .3s ease;
    overflow: hidden;
    padding: 0 10px;
    z-index: 4;

    &.new-alarm {
        .btn-alarm::after {
            content: "";
            display: block;
            width: 15px;
            height: 15px;
            border-radius: 5px;
            background-color: ${ props => props.theme.colors.realRed };
            position: absolute;
            top: 20px; right: 13px;
            animation: alert 1s ease infinite;
        }
        @keyframes alert {
            30% { transform: scale(1.2); }
            40%, 60% { transform: rotate(-20deg) scale(1.2); }
            50% { transform: rotate(20deg) scale(1.2); }
            70% { transform: rotate(0deg) scale(1.2); }
            100% { transform: scale(1); }
        }
    }
    
    .btn-alarm, .btn-close {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        position: absolute;
        top: 0; right: 0;
        z-index: 4;
        svg { width: 60%; height: 60%; }
    }
    .btn-alarm { color: ${ props => props.theme.colors.realRed }; }
    .btn-close {
        svg { width: 40%; height: 40%; }
        color: ${ props => props.theme.colors.commonBlack };
    }

    .title-wrapper {
        width: 100%;
        height: 100px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        cursor: pointer;

        .alarm-title {
            /* visibility: hidden; */
            font-size: 26px;
            line-height: 31px;
            font-weight: 700;
            margin-bottom: 5px;
            opacity: 0;
            transition: all .1s ease;
        }
        .alarm-total {
            /* visibility: hidden; */
            font-size: 20px;
            line-height: 24px;
            font-weight: 400;
            opacity: 0;
            transition: all .1s ease;
        }
    }

    .btn-refresh {
        display: block;
        width: 100px;
        height: 30px;
        margin: 0 auto 8px;
        font-size: 18px;
        line-height: 30px;
        svg { margin-left: 6px; }
    }

    .lists-wrapper {
        max-height: 0;
        transition: all .2s ease;
        overflow: hidden;

        .outer {
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
        .inner {
            border-top: 1px solid ${ props => props.theme.colors.border };
            padding: 17px 0 10px;
        }
    }
    &.closeAll {
        width: 100px;
        height: 100px;
        border-radius: 50%;
    }

    &.active-step1 {
        width: 220px;
        border-radius: 5px;

        .alarm-title { 
            animation: show .3s ease forwards;
            animation-delay: .3s;
        }
        .alarm-total { 
            animation: show .3s ease forwards;
            animation-delay: .4s;
        }
        @keyframes show {
            from { opacity: 0; visibility: hidden; }
            to { opacity: 1; visibility: visible; }
        }
    }
    &.active-step2 {
        width: 448px;
        height: auto;


        .lists-wrapper {
            max-height: 360px;
            transition-delay: .4s;
            
            .outer {
                max-height: 320px;
            }
        }
    }
`;

export const AlarmListStyles = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 50px;
    font-size: 1rem;
    font-weight: 300;
    transition: all .1s ease;
    background-color: ${ props => props.theme.colors.realWhite };
    padding: 0 15px 0 5px;
    cursor: pointer;

    &:not(:last-child) { margin-bottom: 10px }

    .msg-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .icon {
        width: 30px;
        height: 30px;
        margin-right: 10px;
        svg { width: 100%; height: 100%; }
    }
    .wrapper {
        display: flex;
        flex-direction: column;

        .msg {
            line-height: 26px;
            .bold { font-weight: 700 }
        }
        .sender { font-weight: 700; }
        .date { font-family: "Montserrat", sans-serif; color: #666666 }
    }

    &:hover {
        color: ${ props => props.theme.colors.realWhite };
        background-color: ${ props => props.theme.colors.realRed };
        
        .date{ color: ${ props => props.theme.colors.realWhite }; }
    }
`;