import styled from "styled-components";

// Section
export const DefaultSection = styled.section`
    max-width: ${ ({ theme }) => theme.size.desktop };
    margin: 0 auto;
`;

export const MainSection = styled(DefaultSection)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    padding-top: 85px;
    margin-bottom: 150px;

    .daily-count {
        display: block;
        font-family: "Montserrat", sans-serif;
        margin-bottom: 10px;
        .count {
            font-size: 36px;
            font-weight: 700;
            color: ${ props => props.limit === 0 ? props.theme.colors.realRed : props.theme.colors.commonBlack }
        }
    }
`;

export const FrdSearchSection = styled(DefaultSection)``;
export const Container = styled.article`

    @media screen and (max-width: 938px){
        &.left-container {
            margin: 0 auto;
            text-align: center;

            button {
                width: 100%;
            }

            .outer-wrapper {
                width: 310px;
                margin: 0 auto;
            }
            .inner-wrapper {
                button:first-child {
                    margin-right: 15px;
                }
            }
        }
        &.right-container {
            width: 100%;
            margin: 50px 10px;
        }
    }
    @media screen and (max-width: 580px){

    }
`;

// Wrapper
export const Wrapper = styled.ul`
    &.descr-wrapper {
        margin-top: 52px;
    }
    &.descr-wrapper li:not(:last-child) {
        margin-bottom: 7px;
    }
`;

