import React from 'react';
import styled from 'styled-components'
import './App.css';
import { Cards } from './components/Cards'
import { useState, useEffect } from 'react';
import axios from "axios";


const App = () => {
  const datetime = new Date()
  const [recovered, handlerecovered] = useState('')
  const [infected, handleinfected] = useState('')
  const [depths, handledepths] = useState('')
  const [countries, handlecountries] = useState('')


  useEffect(() => {
    axios.get(`https://covid19.mathdro.id/api`)
      .then(res => {
        const recoveredpeople = res.data.recovered.value;
        const infectedpeople = res.data.confirmed.value;
        const depthspeople = res.data.deaths.value;
        handlerecovered(recoveredpeople)
        handleinfected(infectedpeople)
        handledepths(depthspeople)
      })
  });
  return (
    <div className="wrapper">
      {console.log(countries)}
      <Title>Covid Tracker</Title>
      <Cards date={datetime} recovered={recovered} infected={infected} depths={depths} />
      <div className="container-label">
        <LabelinfoText>Infected</LabelinfoText>
        <LabelinfoText>deaths</LabelinfoText>
      </div>
      <select>
        <option>Global</option>
      </select>
    </div>
  );
}

export default App;
const Title = styled.h2`
padding-top:7rem;
font-size:3rem;
text-align:center;
`
const Select = styled.select`
text-align:center;
`;
const LabelinfoText = styled.span`
display:block;
font-size:2rem;
&::after{
content:'';
display: block;
width:10rem;
height:3vh;
background:red;
text-align:center;
}
`

