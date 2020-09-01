import React from 'react';
import styled from 'styled-components'
import './App.css';
import { Cards } from './components/Cards'
import { Chart } from './components/Chart'
import { useState, useEffect } from 'react';
import axios from "axios";

const App = () => {
  let todaydate = new Date();

  let options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    timezone: 'UTC',
    hour: 'numeric',
    minute: 'numeric',
  };
  let currentdate = todaydate.toLocaleString('ru', options);

  const [states, setState] = useState({
    infected: '',
    recovered: '',
    tmpdeaths: '',
    countries: '',
  });

  const [currentcountry, handlecountries] = useState('global');


  const fetchData = async () => {
    const responseglobal = await axios.get('https://covid19.mathdro.id/api');
    const responsecountries = await axios.get('https://covid19.mathdro.id/api/countries');
    setState({
      infected: responseglobal.data.confirmed.value,
      recovered: responseglobal.data.recovered.value,
      tmpdeaths: responseglobal.data.deaths.value,
      countries: responsecountries.data.countries,
    })

  }

  const arrtowns = () => {
    const arrcountries = []
    for (let i = 1; i < states.countries.length; i++) {
      arrcountries.push(states.countries[i].name)
    }
    return arrcountries
  }

  const handlerequest = async (event) => {
    handlecountries(event.target.value);
    if (event.target.value === 'global') {
      fetchData()
    } else {
      const responseglobal = await axios.get(`https://covid19.mathdro.id/api/countries/${event.target.value}`);
      const responsecountries = await axios.get('https://covid19.mathdro.id/api/countries');
      setState({
        infected: responseglobal.data.confirmed.value,
        recovered: responseglobal.data.recovered.value,
        tmpdeaths: responseglobal.data.deaths.value,
        countries: responsecountries.data.countries,
      })
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="wrapper" >
      <Title>Covid Tracker</Title>
      <Cards date={currentdate} infected={states.infected} recovered={states.recovered} deaths={states.tmpdeaths} />
      <Wrapperaligncenter className="container-label">
      </Wrapperaligncenter>
      <Wrapperaligncenter>
        <select value={currentcountry} onChange={(event) => {
          handlerequest(event)
        }}>
          <option value='global'>global</option>
          {arrtowns().map((i, item) => {
            return <option value={i} key={item}>{i}</option>
          })}
        </select>
      </Wrapperaligncenter>
      <WrapperChart>
        <Chart infected={states.infected} recovered={states.recovered} deaths={states.tmpdeaths} />
      </WrapperChart>
    </div>
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