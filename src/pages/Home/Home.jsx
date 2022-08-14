import React, { useRef, useState } from 'react'
import styled from "styled-components"
import { SectionMain, SectionFrdSearch } from '../../components/cointainer/Section/Section'

const HomePage = styled.div``;

const Home = () => {
  const [ newCard, setNewCard ] = useState(false);
  const [ card, setCard ] = useState({
    nickName: "",
    job: "", 
  });

  const nickNameRef = useRef();
  const jobRef = useRef();

  const { nickName, job } = card; // 비구조화 할당을 통해 값 추출

  const selectNewOrPrev = () => {
    setNewCard(!newCard);
  }

  const onChange = (e) => { // input change 이벤트
    const { value, name } = e.target;
    setCard({ ...card, [name]: value });
  }

  const updateCard = (data) => { // 클릭에 이벤트
    setCard({ ...card, [data.key]: data.value });
  }

  return (
    <HomePage>
      <input readOnly ref={nickNameRef} name="nickName" placeholder="nickName" type="text"  value={card.nickName}/>
      <input readOnly ref={jobRef} name="job" placeholder="job" type="text"  value={card.job}/>

      <SectionMain 
        card={card}
        newCard={newCard}
        updateCard={updateCard}
        onChange={onChange}
        selectNewOrPrev={selectNewOrPrev}
      />
      <SectionFrdSearch />
    </HomePage>
  )
}

export default Home