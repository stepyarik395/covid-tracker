import React from 'react';
import styled from 'styled-components'
import './App.css';
import { Cards } from './components/Cards'
import { useState, useEffect } from 'react';
import axios from "axios";




const App = () => {
  const [infected, setRepos] = useState([]);
  // const datetime = new Date()
  const [recovered, handlerecovered] = useState([])
  const [deaths, handledepths] = useState([])
  const [countries, handlecountries] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('https://covid19.mathdro.id/api');
      setRepos(response.data.confirmed);
      handlerecovered(response.data.recovered);
      handledepths(response.data.deaths);
    }
    fetchData();
  }, []);
  return (
    <div className="wrapper">
      <Title>Covid Tracker</Title>
      <Cards infected={infected} recovered={recovered} deaths={deaths} />
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

