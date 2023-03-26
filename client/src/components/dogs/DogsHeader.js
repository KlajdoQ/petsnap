import React from 'react'
import styled from 'styled-components'

export default function DogsHeader() {
  return (
    <Header>Todays Dog Facts</Header>
  )
}

/*******************************
*   STYLED COMPONENTS          *
*******************************/
const Header = styled.div 
` background-color: rgb(237, 126, 126);
color:white;
width:190px;
padding:10px;
font-weight: bold;
font-size: 20px;
margin-top:20px;
border-radius: 5px;
text-align: center;
margin-bottom:20px;`