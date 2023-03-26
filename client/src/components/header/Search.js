import React from 'react';
import styled from 'styled-components';


export default function SearchBar({ search, setSearch }) {
  
  function handleChange(e) {
    setSearch(e.target.value)
  }

  return (
    <SearchBarDiv>
      <SearchLabel>
        <SearchBox
          type="text"
          value={search}
          onChange={handleChange}
          placeholder="Search by name or breed ..."
        />
      </SearchLabel>
    </SearchBarDiv>
  )
}

/*******************************
*   STYLED COMPONENTS          *
*******************************/
const SearchBarDiv = styled.div`
  margin-top:50px;
  height:110px;
 
  @media (max-width:800px) {
    width:350px;
  }
  `;
  
  const SearchLabel = styled.label`
  font-size:25px;
  display:flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-family: "Roboto";
  font-weight: bold;
  `;
  
  const SearchBox = styled.input`
  height:42px;
  min-width:400px;
  max-width: 200px;
  border:1px solid lightgrey;
  font-size:20px;
  opacity:0.8;
  outline:none;
  padding-left:20px;
  margin-top:8px;
  
  @media (max-width:800px) {
    margin-top:35px;
  }
`;
