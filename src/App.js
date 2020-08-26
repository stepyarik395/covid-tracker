import React from 'react';
import styled from 'styled-components'
import './App.css';
import { Cards } from './components/Cards'
import { useState, useEffect } from 'react';
import axios from "axios";
import { Doughnut } from 'react-chartjs-2';

const App = () => {

  const [infected, setRepos] = useState([]);
  const [recovered, handlerecovered] = useState([])
  const [deaths, handledepths] = useState([])
  const [countries, handlecountries] = useState([])
  const [targetcountry, handlecountry] = useState('global')



  const data = {
    labels: ['infected', 'Recovered', 'death'],
    datasets: [
      {
        data: [infected.value, recovered.value, deaths.value],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
      }
    ]
  };
  console.log(data.datasets)


  const fetchData = async (data) => {
    const responseglobal = await axios.get('https://covid19.mathdro.id/api');
    const responsecountries = await axios.get('https://covid19.mathdro.id/api/countries');
    setRepos(responseglobal.data.confirmed);
    handlerecovered(responseglobal.data.recovered);
    handledepths(responseglobal.data.deaths);
    handlecountries(responsecountries.data.countries);

  }

  const somefunc = () => {
    const arrcountries = []
    for (let i = 1; i < countries.length; i++) {
      arrcountries.push(countries[i].name)
    }
    return arrcountries
  }

  const soma = async (event) => {
    handlecountry(event.target.value)
    if (event.target.value === 'global') {
      const responseglobal = await axios.get('https://covid19.mathdro.id/api');
      setRepos(responseglobal.data.confirmed);
      handlerecovered(responseglobal.data.recovered);
      handledepths(responseglobal.data.deaths);
    } else {
      const responsecountries = await axios.get(`https://covid19.mathdro.id/api/countries/${event.target.value}`);
      setRepos(responsecountries.data.confirmed);
      handlerecovered(responsecountries.data.recovered);
      handledepths(responsecountries.data.deaths);
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
        <LabelinfoText>Infected</LabelinfoText>
        <LabelinfoText>deaths</LabelinfoText>
      </Wrapperaligncenter>
      <Wrapperaligncenter>
        <select value={targetcountry} onChange={(event) => {
          soma(event)
        }}>
          <option value='global'>global</option>
          {somefunc().map((i, item) => {
            return <option value={i} key={item}>{i}</option>
          })}
        </select>
      </Wrapperaligncenter>
      <WrapperChart>
        <Doughnut data={data}
          options={{ maintainAspectRatio: false }} />
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
const Select = styled.select`
cursor:pointer;
text-align:center;

`;
const LabelinfoText = styled.span`
padding:1rem;
display:block;
font-size:2rem;
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