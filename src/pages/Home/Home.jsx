import React, { useRef, useState } from 'react'
import { useEffect } from 'react';
import styled from "styled-components"
import SectionFrdSearch from '../../components/Section/FrdSearch/FrdSearch';
import SectionMain from '../../components/Section/Main/Section';

const Home = ({login}) => {
  const [ selectBoxes, setSelectBox ] = useState({
    FRD : { show: false },
  });
  const mainPopup = useRef(false);
  
  const handlePopup = (evt) => {
    const targetEle = evt.target.className;
    const targetTag = evt.target.tagName;

    console.log("mainPopup.current : ", mainPopup.current );
    
    if(mainPopup.current === false &&
      (selectBoxes["FRD"].show &&
      (targetEle !== "frd-id" &&
      targetEle !== "dimmed-bg" &&
      targetTag != "INPUT" && 
      targetTag != "BUTTON" && 
      targetTag != "path" && 
      targetTag != "svg")))
    {
      handleSelectBoxes({ name: "FRD", state: false });
    }
  }

  const handleSelectBoxes = (popup) => {
    setSelectBox((selectBoxes) => {
      const updated = { ...selectBoxes };
      updated[popup.name].show = popup.state;
      return updated;
    })
  }


  return (
    <HomePage onClick={handlePopup}>
      <SectionMain
        login={login} />
      <SectionFrdSearch 
        login={login}
        mainPopup={mainPopup}
        sOpen={selectBoxes.FRD.show}
        handleSelectBoxes ={handleSelectBoxes } />
    </HomePage>
  )
}

export default Home

const HomePage = styled.div`
  padding-bottom: 600px;
`;