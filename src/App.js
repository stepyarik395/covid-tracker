import React from 'react';
import styled from 'styled-components'
import './App.css';
import { Cards } from './components/Cards'
import { Chart } from './components/Chart'
import { useState, useEffect } from 'react';
import axios from "axios";


const App = () => {
  const [infected, handleinfected] = useState([]);
  const [recovered, handlerecovered] = useState([])
  const [deaths, handledepths] = useState([])
  const [countries, handlecountries] = useState([])
  const [targetcountry, handlecountry] = useState('global')

  let SetState = (responseglobal) => {
    handleinfected(responseglobal.data.confirmed);
    handlerecovered(responseglobal.data.recovered);
    handledepths(responseglobal.data.deaths);
  }

  const fetchData = async () => {
    const responseglobal = await axios.get('https://covid19.mathdro.id/api');
    const responsecountries = await axios.get('https://covid19.mathdro.id/api/countries');
    SetState(responseglobal);
    handlecountries(responsecountries.data.countries)
  }

  const arrtowns = () => {
    const arrcountries = []
    for (let i = 1; i < countries.length; i++) {
      arrcountries.push(countries[i].name)
    }
    return arrcountries
  }

  const handlerequest = async (event) => {
    handlecountry(event.target.value)
    if (event.target.value === 'global') {
      const responseglobal = await axios.get('https://covid19.mathdro.id/api');
      SetState(responseglobal);
    } else {
      const responseglobal = await axios.get(`https://covid19.mathdro.id/api/countries/${event.target.value}`);
      SetState(responseglobal);
    }
  }
  useEffect(() => {

    fetchData();
  }, []);

  return (
    <div className="wrapper" >
      <Title>Covid Tracker</Title>
      <Cards infected={infected} recovered={recovered} deaths={deaths} />
      <Wrapperaligncenter className="container-label">
      </Wrapperaligncenter>
      <Wrapperaligncenter>
        <select value={targetcountry} onChange={(event) => {
          handlerequest(event)
        }}>
          <option value='global'>global</option>
          {arrtowns().map((i, item) => {
            return <option value={i} key={item}>{i}</option>
          })}
        </select>
      </Wrapperaligncenter>
      <WrapperChart>
        <Chart infected={infected} recovered={recovered} deaths={deaths} />
      </WrapperChart>
    </div >
  );
}

export default App;
const Title = styled.h2`
padding-top:7rem;
font-size:3rem;
text-align:center;
`
const Wrapperaligncenter = styled.div`
padding-top:4rem;
display:flex;
justify-content:center;
`
const WrapperChart = styled.div`
padding-top:40px;
margin:0 auto;
max-width:500px;
height:200px;
`;