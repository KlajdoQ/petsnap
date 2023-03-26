// useEffect(() => {
//   if (user) {
//     fetch("http://localhost:3000/conversations")
//       .then((response) => response.json())
//       .then((data) => {
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }
// }, [user]);

  
  import React, {useState, useEffect} from 'react';
  import './App.css'
  import Header from './components/header/Header'
  import Content from './components/content/Content'
  import Footer from './components/Footer'
  import Login from './Login'
  import SignUp from './SignUp'
  import Profile from './Profile'
  import {Routes, Route} from "react-router-dom"
  import { UserContext } from './components/contexts/UserContext'
  import ChatModal from './components/content/ChatModal'
  import { CableProvider } from './components/content/CableContext';


export default function App() {
  const [animals, setAnimals] = useState([]);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);
  const [newMessage, setNewMessage] = useState(null);

  
  function addNewAnimal(newAnimal) {
    setAnimals([newAnimal, ...animals]);
  }



  return (
    <CableProvider>

    <UserContext.Provider value={{ user, setUser }} >
      <div className="app">
        
        <Routes>
          <Route
            path="/login"
            element={<Login setUser={setUser} />}
          />
          <Route
            path="/signup"
            element={<SignUp setUser={setUser} />}
          />
            <Route
            path="/profile"
            element={<Profile setUser={setUser} />}/>
          <Route
            path="/"
            element={user ? (
              <>
              <Header 
                search={search} 
                setSearch={setSearch} 
                setUser={setUser}/>
              <Content
                search={search}
                animals={animals}
                setAnimals={setAnimals}
                addNewAnimal={addNewAnimal}
                setUser={setUser}
                newMessage={newMessage}
                setNewMessage={setNewMessage}
              />
              <ChatModal />
              <Footer />
              </>
            ) : (
              <div className="login-to-view" >
                <Header 
                    addNewAnimal={addNewAnimal} 
                    search={search} 
                    setSearch={setSearch} 
                    setUser={setUser}/>
                <div className="error-msg">You must be <br></br>logged in <br></br>to view this <br></br>content!</div>
              </div>
             
            )}
          />
        </Routes>
      </div>
    </UserContext.Provider>
    </CableProvider>
  );
}

