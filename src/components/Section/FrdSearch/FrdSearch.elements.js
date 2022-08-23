import styled from "styled-components";

export const DefaultSection = styled.section`
    /* max-width: ${ ({ theme }) => theme.size.desktop }; */
    margin: 0 auto;
`;

export const FrdSearchSection = styled(DefaultSection)`
    width: 100%;
    height: 340px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Noto Sans KR", sans-serif;
    background-color: ${ props => props.theme.colors.realWhite };

    h3 { text-align: center; };
`;

export const Wrapper = styled.div`
    width: 340px;
    position: relative;
`;

export const Container = styled.div` // height 조절로 드롭다운 처럼 보인다.
    visibility: hidden;
    width: 100%;
    height: 0;
    overflow: hidden;
    position: absolute;
    top: 110px; left: 0;
    transition: height .4s ease;
    border: 1px solid ${ ({theme}) => theme.colors.commonBlack };
    border-radius: 5px;
    background-color: ${ ({theme}) => theme.colors.realWhite };

    h3 {
        text-align: left;
        border-bottom: 1px solid ${ ({theme}) => theme.colors.border };
        margin: 0 10px;
    }
`;

export const ResultBody = styled.div`
    padding: 10px 0;

    & .list-wrapper {
        height: 110px;
        overflow-y: auto;
    }
    & .list-wrapper::-webkit-scrollbar { width: 10px; }
    & .list-wrapper::-webkit-scrollbar-thumb { 
        border-radius: 10px;
        background-clip: padding-box;
        border: 2px solid transparent;
        background-color: ${({theme}) => theme.colors.border};
    }
    & .list-wrapper::-webkit-scrollbar-track {}

    li {
        width: 100%;
        height: 40px;
        line-height: 40px;
        padding-left: 10px;
        cursor: pointer;

        &:hover { background-color: ${({theme}) => theme.colors.highLight}; };
    }
    .loading-box {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 110px;

        img { animation: spin 2s ease infinite; }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    }
    .fail-box {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 110px;
        color: #C9C9C9;

        svg { width: 30px; height: 30px; }
    }
`;