import React, {useState, useEffect} from 'react'
import Search from './Search'
import Logo from '../images/logo-color2.png'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import './Header.css'
import ChatModal from '../content/ChatModal'

import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

export default function Header({ search, setSearch, setUser }) {
  const { user = null } = useContext(UserContext); 
  const userImage = localStorage.getItem("userImage");

  const [showChatModal, setShowChatModal] = useState(false);
  const [hasReceivedMessage, setHasReceivedMessage] = useState(false);

  const handleLogout = () => {
    fetch("http://localhost:3000/logout", { method: 'DELETE' })
      .then(() => {
        setUser(null);
      })
      .catch((error) => console.error(error));
  };

  const handleMessagesClick = () => {
    
        setShowChatModal(true);
    setHasReceivedMessage(false); 
  };


  return (
    <div className="header-div">
      <Link to="/">
        <LogoImg src={Logo} alt="logo" />
      </Link>
      {user ? (
        <>
          <Search search={search} setSearch={setSearch} />
          <div className='header-links'>
            {hasReceivedMessage && (
  <div className='nav-link' onClick={handleMessagesClick}>
    ✉️ Messages
  </div>
)}
            {userImage && (
              <img className="userImg" src={userImage} alt="User" />
            )}           
            <Link to="/profile" className="nav-link">
              {user.full_name}
            </Link>
            <button onClick={handleLogout} className="logoutBtn">
              Log Out
            </button>
          </div>
        </>
      ) : (
        <div className="header-links">
          <button className="navBtn">
            <Link to="/login"  className="navLink">
              Login
            </Link>
          </button>
          <button  className="navBtn">
            <Link to="/signup"className="navLink" >
              Sign Up
            </Link>
          </button>
        </div>
      )}
      {showChatModal && user && (
        <ChatModal
          currentUser={{ id: user.id }}
          handleClose={() => setShowChatModal(false)}
          setHasReceivedMessage={setHasReceivedMessage} // pass the function to update the hasReceivedMessage state

        />
      )}
    </div>
  );
}

/*******************************
*   STYLED COMPONENTS          *
*******************************/

const LogoImg = styled.img`
  width:160px;
  @media (max-width:600px) {
    width:100px;
    position: absolute;
    top: 15px;
    left: 0;
  }
`


