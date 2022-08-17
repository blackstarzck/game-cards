import React from 'react'
import styled from "styled-components"
import SectionFrdSearch from '../../components/Section/FrdSearch/FrdSearch';
import SectionMain from '../../components/Section/Main/Section';

const HomePage = styled.div`
  padding-bottom: 600px;
`;

const Home = ({login}) => {
  return (
    <HomePage>
      <SectionMain login={login}/>
      <SectionFrdSearch login={login}/>
    </HomePage>
  )
}

export default Home