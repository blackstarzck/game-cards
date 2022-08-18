import React, { useEffect, useRef } from 'react'
import { FrdSearchSection, Container, ResultBody, Wrapper } from './FrdSearch.elements'
import { ResultHeading, TitleSection } from '../../Texts/Texts'
import icon1 from '../../../assets/images/frd-srch-ico.png'
import icon2 from '../../../assets/images/loading.png'
import { InputFrdSrch } from '../../Input/Input'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceConfused } from '@fortawesome/pro-light-svg-icons'
import { faList } from '@fortawesome/pro-regular-svg-icons'
import Database from '../../../service/database'
import { MainPopup } from '../../Popups/Popups'
import { gsap } from "gsap"

const data = new Database();

const SectionFrdSearch = ({login, sOpen, handleSelectBoxes, mainPopup}) => {
    const [ searchResult, setStatus ] = useState({ // waiting -> pending -> finished( 성공 / 실패 )
        proc: "waiting", 
        result: "success", 
        frdId: "",
        name: ""
    });
    const [ popup, setPopup ] = useState(false);
    const [ loading, setLoading ] = useState(true);

    const searchFunc = (frdId) => {
        if(login){
            data.getSingleData("USERS", frdId).then((frd) => {
                handleSelectBoxes({name: "FRD", state: true});
                setLoading(true);
                if(frd){
                    mainPopup.current = true;
                    setStatus({
                        ...searchResult,
                        proc : "finished",
                        result : "success",
                        frdId : frd.USER_ID,
                        name : frd.USER_NAME
                    });
                }else{
                    setStatus({
                        ...searchResult,
                        proc : "finished",
                        result : "failed",
                        frdId : "",
                        name : ""
                    });
                }
                setLoading(false);
            });
        }
    }

    return (
        <FrdSearchSection>
            <Wrapper>
                <TitleSection><img src={icon1} alt="" />친구찾기</TitleSection>

                <InputFrdSrch 
                    login={login}
                    searchFunc={searchFunc} 
                    Open={sOpen} />
                { login && <SrchResult
                    sOpen={sOpen}
                    setPopup={setPopup}
                    loading={loading}
                    searchResult={searchResult}/> }
            </Wrapper>
            <MainPopup 
                mainPopup={mainPopup} 
                popup={popup} 
                type={"FRD-REQ"} 
                data={searchResult} 
                handleSelectBoxes={handleSelectBoxes}
                setPopup={setPopup} />
        </FrdSearchSection>
    );
}

export default SectionFrdSearch;

export const SrchResult = ({loading, sOpen, searchResult, setPopup}) => {
    const el = useRef(null);

    useEffect(() => {
        const height = sOpen ? "179px" : 0;
        if(sOpen){
            el.current.style.visibility = "visible";
        }else{
            setTimeout(() => {
                el.current.style.visibility = "hidden";
            }, 380); // 완벽하게 닫히고  안보이게 처리해야 한다. (border가 보이는 현상때문)
        }

        el.current.style.height = height;

        console.log("sOpen: " + sOpen, height);
    }, [sOpen]);

    return(
        <Container ref={el}>
            <ResultHeading><FontAwesomeIcon icon={faList}/>결과</ResultHeading>
            <ResultBody>
                { loading ? 
                    <LoadingBox /> :
                    ((searchResult.proc === "finished" && searchResult.result === "success") ? <ListBox searchResult={searchResult} setPopup={setPopup} /> : <FailBox />) }
            </ResultBody>
        </Container>
    );
}

export const ListBox = ({searchResult, setPopup}) => {
    return(
        <div className="list-wrapper">
            <ul>
                <li className="frd-id" onClick={() => setPopup(true)} >
                    {`${searchResult.frdId} (${searchResult.name})`}
                </li>
            </ul>
        </div>
    );
}

export const LoadingBox = () => <div className="loading-box"><img src={icon2} alt="" /></div>

export const FailBox = () => <div className="fail-box"><FontAwesomeIcon icon={faFaceConfused} /></div>
