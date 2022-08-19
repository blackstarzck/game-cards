import styled from "styled-components";
import { Link } from "react-router-dom";


export const LoginContainer = styled.section`
    width: 300px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    h1 { margin: 0 auto 42px; }
    input { margin-bottom: 7px; }


`;

export const Wrapper = styled.div`

    &.input-wrapper { margin-bottom: 27px; };
    &.btns-wrapper { margin-top:  15px; };
    &.sns-wrapper { width: 200px; display: flex; justify-content: space-between;margin: 40px auto 0 };


    label {
        display: flex;
        align-items: center;
        font-size: 14px;
        color: ${ props => props.theme.colors.commonBlack };
        cursor: pointer;
    }

    input[type=checkbox] {
        position: absolute;
        width: 1px; height: 1px; overflow: hidden; clip: rect(1px, 1px, 1px, 1px);
    }
    
    input[type=checkbox]:checked + label .checkbox {
        background: ${(props) => props.theme.colors.primaryColor };
        border-color: #ffffff;
    }

    .checkbox {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 24px;
        height: 24px;
        border: 1px solid #D9D9D9;
        border-radius: 5px;
        background-color: #ffffff;
        margin-right: 7px;

        svg { color: #ffffff }
    }
`;

export const NewLink = styled(Link)`
    display: inline-block;
    font-size: 1rem;
    font-weight: 400;
    width: calc(100% / 2);
    text-align: center;
`