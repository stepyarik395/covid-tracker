import React from 'react';
import styled from 'styled-components'



export const Cards = (props) => {
  return (
    <Wrapper>
      <Card>
        <TitleCard>Infected</TitleCard>
        <Number>{props.infected}</Number>
        <Date>date</Date>
        <CardText>number of active Cases of COVID-19</CardText>
      </Card>
      <Card>
        <TitleCard>Recovered</TitleCard>
        <Number>{props.recovered}</Number>
        <Date>date</Date>
        <CardText>number of recovered Cases of COVID-19</CardText>
      </Card>
      <Card>
        <TitleCard>Deaths</TitleCard>
        <Number>{props.deaths}</Number>
        <Date>date</Date>
        <CardText>number of deaths Cases of COVID-19</CardText>
      </Card>
    </Wrapper>
  )
}

const Wrapper = styled.div`
padding-top:1rem;
display:flex;
justify-content:center;
`;
const Card = styled.div`
padding-bottom:2rem;
padding-left:2rem;
padding-top:2rem;
padding-right:2rem;
border-radius:1rem;
margin:2rem;
border:1px solid #ebebeb;

`;
const TitleCard = styled.h3`
padding-top:1rem;
font-size:2rem;
`;
const Date = styled.span`
max-width:300px;
padding-top:1rem;
display:block;
font-size:2rem;
`;
const CardText = styled.p`
padding-top:1rem;
font-size:2rem;
`;
const Number = styled.label`
display:block;
padding-top:2rem;
font-weight:bold;
font-size:2.5rem;
`;