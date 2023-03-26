import React from 'react'
import styled from 'styled-components'

// Define a styled component for the header
const Header = styled.div 
` background-color: rgb(237, 126, 126);
color:white;
width:190px;
padding:10px;
font-weight: bold;
font-size: 20px;
border-radius: 5px;
text-align: center;
margin-left:10px;
margin-bottom:20px;`


export default function CatsHeader() {
  return (
    <Header>Todays Cat Facts</Header>
  )
}
