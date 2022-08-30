import styled from "styled-components";

export const StorageSection = styled.section`
    max-width: ${ ({ theme }) => theme.size.desktop };
    margin: 156px auto 0;

    .top {
        display: flex;
        justify-content: center;
        margin-bottom: 35px;
        padding: 16px 16px 0;
    }
    .body {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: auto;
        grid-gap: 30px;
    }
    @media screen and (max-width: 1200px){
        .body { grid-template-columns: repeat(3, 1fr); padding: 0 10px; }
    }
    @media screen and (max-width: 900px){
        .body { grid-template-columns: repeat(2, 1fr); padding: 0 10px; }
    }
    @media screen and (max-width: 600px){
        .body { grid-template-columns: repeat(1, 1fr); padding: 0 10px; }
    }
`;

export const FilterContainer = styled.div`
    display: flex;

    .heading {
        width: 75px;
        font-size: 18px;
        line-height: 40px;
        height: 40px;
        font-weight: 700;
        text-align: center;
        color: ${props => props.theme.colors.commonBlack };
        position: relative;

        &::after {
            content: "";
            display: block;
            width: 1px;
            height: 50%;
            background-color: #BCBCBC;
            position: absolute;
            top: 0; right: 0; bottom: 0; margin: auto;
        }
    }
`;

export const FilterWrapper = styled.ul`
    width: 490px;
    display: flex;
    margin-left: 15px;
    
    button.active { font-weight: 700 }; 

    li {
        width: calc(100% / 6);

        button {
            width: 100%;
            font-size: 18px;
            line-height: 40px;
            height: 40px;
            font-weight: 400;
            color: ${props => props.theme.colors.commonBlack };
        }
    }
`;