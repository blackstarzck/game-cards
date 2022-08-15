import React from 'react'
import styled from "styled-components";

const MainCardInputs = styled.div`
    width: 300px;
    position: fixed;
    left: 100px; top: 50px;
    padding: 10px;
    background-color: rgba(0,0,0,.5);
    border-radius: 5px;

    li { display: flex; }
    li span { width: 95px; font-size: 14px; color: #ffffff;margin-right: 5px; }
    li:not(:last-child) { margin-bottom: 5px; }
    input[type=text] { width: 100%; text-indent: 8px; }
`;

const MainViewer = ({...props}) => {
  return (
    <MainCardInputs>
        <ul>
            <li><span>nickName:</span><input readOnly name="nickName" placeholder="" type="text"  value={props.mainCard.nickName || ""} /></li>
            <li><span>jobKR:</span><input readOnly name="jobKR" placeholder="" type="text"  value={props.mainCard.jobKR || ""} /></li>
            <li><span>jobEN:</span><input readOnly name="jobEN" placeholder="" type="text"  value={props.mainCard.jobEN || ""} /></li>
            <li><span>level: </span><input readOnly name="level: " placeholder="" type="text"  value={props.mainCard.level  || ""} /></li>
            <li><span>exp:</span><input readOnly name="exp" placeholder="" type="text"  value={props.mainCard.exp || ""} /></li>
            <li><span>groupNo:</span><input readOnly name="groupNo" placeholder="" type="text"  value={props.mainCard.groupNo || ""} /></li>
            <li><span>code:</span><input readOnly name="code" placeholder="" type="text"  value={props.mainCard.code || ""} /></li>
            <li><span>descr:</span><input readOnly name="descr" placeholder="" type="text"  value={props.mainCard.descr || ""} /></li>
            <li><span>quote:</span><input readOnly name="quote" placeholder="" type="text"  value={props.mainCard.quote || ""} /></li>
            <li><span>selected:</span><input readOnly name="selected" placeholder="" type="text"  value={props.mainCard.selected || ""} /></li>
            <li><span>imgURL:</span><input readOnly name="imgURL" placeholder="" type="text"  value={props.mainCard.imgURL || ""} /></li>
        </ul>
    </MainCardInputs>
  )
}

export default MainViewer