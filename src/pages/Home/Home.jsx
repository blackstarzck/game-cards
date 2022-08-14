import React, { useRef, useState } from 'react'
import styled from "styled-components"
import { SectionMain, SectionFrdSearch } from '../../components/cointainer/Section/Section'

const HomePage = styled.div``;

const Home = () => {
  return (
    <HomePage>
      <SectionMain />
      <SectionFrdSearch />
    </HomePage>
  )
}

export default Home