import React, { useRef } from 'react'
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
import { useEffect } from 'react'

const data = new Database();

const SectionFrdSearch = ({login}) => {
    const [ searchResult, setStatus ] = useState({ // waiting -> pending -> finished( 성공 / 실패 )
        proc: "waiting", 
        result: "success", 
        frdId: ""
    });
    const [ loading, setLoading ] = useState(true);
    const [ open, setOpend ] = useState(false);

    const searchFunc = (frdId) => {
        if(login){
            data.getSingleData("USERS", frdId).then((frd) => {
                console.log("result:", frd);
                setOpend(true);
                setLoading(true);
                if(frd){
                    setStatus((searchResult) => {
                        const updated = { ...searchResult };
                        updated["proc"] = "finished";
                        updated["result"] = "success";
                        updated["frdId"] = frd.USER_ID;
                        return updated;
                    });
                }else{
                    setStatus((searchResult) => {
                        const updated = { ...searchResult };
                        updated["proc"] = "finished";
                        updated["result"] = "failed";
                        updated["frdId"] = "";
                        return updated;
                    });
                }
                setLoading(false);
            });
        }
        console.log("input name: ", frdId);
    }

    useEffect(() => {
        console.log("open: ", open);
    }, []);

    useEffect(() => {
        console.log("searchResult ", searchResult);
    }, [searchResult]);

    return (
        <FrdSearchSection>
            <Wrapper>
                <TitleSection><img src={icon1} alt="" />친구찾기</TitleSection>

                <InputFrdSrch login={login} searchFunc={searchFunc}/>
                { login && <SrchResult
                    open={open}
                    setOpend={setOpend}
                    loading={loading}
                    searchResult={searchResult}/> }
            </Wrapper>
        </FrdSearchSection>
    );
}

export default SectionFrdSearch;

export const SrchResult = ({loading, open, setOpend, searchResult}) => {

    useEffect(() => {
        console.log("SrchResult컴포넌트: ", searchResult);
    }, [searchResult]);
    
    return(
        <Container open={open}>
            <ResultHeading><FontAwesomeIcon icon={faList}/>결과</ResultHeading>
            <ResultBody>
                { loading ? 
                    <LoadingBox /> :
                    ((searchResult.proc === "finished" && searchResult.result === "success") ? <ListBox friend={searchResult.frdId} setOpend={setOpend} /> : <FailBox />) }
            </ResultBody>
        </Container>
    );
}

export const ListBox = ({friend, setOpend}) => {
    return(
        <div className="list-wrapper">
            <ul>
                <li>{friend}</li>
            </ul>
        </div>
    );
}

export const LoadingBox = () => <div className="loading-box"><img src={icon2} alt="" /></div>

export const FailBox = () => <div className="fail-box"><FontAwesomeIcon icon={faFaceConfused} /></div>
