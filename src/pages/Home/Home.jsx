import React from 'react'
import styled from "styled-components"
import { SectionMain, SectionFrdSearch } from '../../components/cointainer/Section/Section'

const HomePage = styled.div``;

const Home = ({login}) => {
  return (
    <HomePage>
      <SectionMain login={login}/>
      <SectionFrdSearch />
    </HomePage>
  )
}

export default Home