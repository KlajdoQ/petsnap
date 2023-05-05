import React from 'react'
import styled from 'styled-components'

export default function Footer() {
  return (
    <FooterDiv className="footer-div">
        <p>@ 2023 Copyright: <span>klajdo-portfolio.com</span></p>
    </FooterDiv>
  )
}

/*******************************
*   STYLED COMPONENTS          *
*******************************/
const FooterDiv = styled.div
`background-color: rgb(230, 114, 47);
height:45px;
text-align:center;
padding-top:10px; `