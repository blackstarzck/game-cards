import React, { useRef, useState } from 'react'
import styled from "styled-components"
import { SectionMain, SectionFrdSearch } from '../../components/cointainer/Section/Section'

const HomePage = styled.div``;

const Home = () => {
  const [ card, setCard ] = useState({
    "nick-name": "",
    "job": "", 
  });

  const nickNameRef = useRef();
  const jobRef = useRef();

  const addCard = (data) => {
    console.log("input: ", data);
    console.log("result: ", data);

    setCard(card => {
      const updated = {...card};
      updated[data.key] = data.value;
      return updated;
    });
  }

  return (
    <HomePage>
      <input ref={nickNameRef} name="nick-name" placeholder="nick-name" type="text"  value={card["nick-name"]}/>
      <input ref={jobRef} name="job" placeholder="job" type="text"  value={card["job"]}/>

      <SectionMain card={card} addCard={addCard} />
      <SectionFrdSearch />
    </HomePage>
  )
}

export default Home