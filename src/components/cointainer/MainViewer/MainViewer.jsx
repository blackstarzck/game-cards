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
            <li><span>NICK:</span><input readOnly name="NICK" placeholder="" type="text"  value={props.mainCard.NICK || ""} /></li>
            <li><span>JOB_KR:</span><input readOnly name="JOB_KR" placeholder="" type="text"  value={props.mainCard.JOB_KR || ""} /></li>
            <li><span>JOB_EN:</span><input readOnly name="JOB_EN" placeholder="" type="text"  value={props.mainCard.JOB_EN || ""} /></li>
            <li><span>LEVEL: </span><input readOnly name="LEVEL: " placeholder="" type="text"  value={props.mainCard.LEVEL  || ""} /></li>
            <li><span>EXP:</span><input readOnly name="EXP" placeholder="" type="text"  value={props.mainCard.EXP || ""} /></li>
            <li><span>GROUP_NO:</span><input readOnly name="GROUP_NO" placeholder="" type="text"  value={props.mainCard.GROUP_NO || ""} /></li>
            <li><span>CODE:</span><input readOnly name="CODE" placeholder="" type="text"  value={props.mainCard.CODE || ""} /></li>
            <li><span>DESCR:</span><input readOnly name="DESCR" placeholder="" type="text"  value={props.mainCard.DESCR || ""} /></li>
            <li><span>QUOTE:</span><input readOnly name="QUOTE" placeholder="" type="text"  value={props.mainCard.QUOTE || ""} /></li>
            <li><span>SELECTED:</span><input readOnly name="SELECTED" placeholder="" type="text"  value={props.mainCard.SELECTED || ""} /></li>
            <li><span>IMG_URL:</span><input readOnly name="IMG_URL" placeholder="" type="text"  value={props.mainCard.IMG_URL || ""} /></li>
        </ul>
    </MainCardInputs>
  )
}

export default MainViewer