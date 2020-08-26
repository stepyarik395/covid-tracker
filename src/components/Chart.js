import React from 'react';
import styled from 'styled-components'
import { Doughnut } from 'react-chartjs-2';




export const Chart = (props) => {

  const data = {
    labels: ['infected', 'Recovered', 'death'],
    datasets: [
      {
        data: [props.infected.value, props.recovered.value, props.deaths.value],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
      }
    ]
  };
  return (
    <div>
      <Doughnut data={data} />
    </div>
  )
}