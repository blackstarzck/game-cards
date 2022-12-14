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
import { useData } from '../../../hooks/hooks'

const data = new Database();

const SectionFrdSearch = ({login, sOpen, handleSelectBoxes, mainPopup, setMainPopup}) => {
    const [ searchResult, setStatus ] = useState({ // waiting -> pending -> finished( 성공 / 실패 )
        proc: "waiting", 
        result: "success", 
        id: "",
        name: "",
        email: "",
    });
    const [ loading, setLoading ] = useState(true);

    const searchFunc = (frdId) => {
        if(login.state){
            data.getSingleData("USERS", frdId).then((frd) => {
                handleSelectBoxes({name: "FRD", state: true});
                setLoading(true);
                if(frd){
                    setStatus({
                        ...searchResult,
                        proc : "finished",
                        result : "success",
                        id : frd.USER_ID,
                        name : frd.USER_NAME,
                        email : frd.USER_EMAIL
                    });
                }else{
                    setStatus({
                        ...searchResult,
                        proc : "finished",
                        result : "failed",
                        id : "",
                        name : "",
                        email: ""
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
                { login.state && <SrchResult
                    login={login}
                    sOpen={sOpen}
                    handleSelectBoxes={handleSelectBoxes}
                    setMainPopup={setMainPopup}
                    mainPopup={mainPopup}
                    loading={loading}
                    searchResult={searchResult}/> }
            </Wrapper>
        </FrdSearchSection>
    );
}

export default SectionFrdSearch;

export const SrchResult = ({login, loading, sOpen, searchResult, setMainPopup, handleSelectBoxes, mainPopup}) => {
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
    }, [sOpen]);

    return(
        <Container ref={el}>
            <ResultHeading><FontAwesomeIcon icon={faList}/>결과</ResultHeading>
            <ResultBody>
                { loading ? 
                    <LoadingBox /> :
                    ((searchResult.proc === "finished" && searchResult.result === "success") ?
                        <ListBox
                            login={login}
                            mainPopup={mainPopup}
                            searchResult={searchResult}
                            setMainPopup={setMainPopup}
                            handleSelectBoxes={handleSelectBoxes}/> : <FailBox />) }
            </ResultBody>
        </Container>
    );
}

export const ListBox = ({login, searchResult, setMainPopup, handleSelectBoxes, mainPopup}) => {
    const [ myHistory, setMyHistory ] = useState();
    const listRef = useRef(null);

    const getAlarmHist = async () => {
        const history = await data.getSingleData("ALARM_TABLE", login.ID);
        setMyHistory(history);
    }

    const handleClick = ()=> {
        console.log(1, myHistory);
        if(myHistory && myHistory.data.length > 0){
            
            for(let i = 0; i < myHistory.data.length; i++){
                if(
                    myHistory.data[i].TRG_ID === searchResult.id &&
                    myHistory.data[i].ALARM_TYPE === "FRD_REQ_SENT"
                ){
                    alert("이미 친구신청하였습니다.");
                    return;
                }
            }
        }
        if(login.ID === searchResult.id){
            alert("사용자 자신을 친구신청할 수 없습니다.");
        }else{
            setMainPopup({ state: true, type: "FRD_REQ_SENT", data: searchResult });
            handleSelectBoxes({name: "FRD", state: true});
        }
    }

    useEffect(() => {
        login.state && getAlarmHist();
    }, [searchResult]);

    return(
        <div className="list-wrapper">
            <ul>
                <li ref={listRef} className="frd-id" onClick={handleClick} >
                    { `${searchResult.id} (${login.ID === searchResult.id ? "나" : searchResult.name})` }
                </li>
            </ul>
        </div>
    );
}

export const LoadingBox = () => <div className="loading-box"><img src={icon2} alt="" /></div>

export const FailBox = () => <div className="fail-box"><FontAwesomeIcon icon={faFaceConfused} /></div>
