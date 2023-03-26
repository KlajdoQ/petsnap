import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import './Login.css'

export default function Login({ setUser}) {

  let navigate = useNavigate()
  let [signInForm, setSignInForm] = useState({
    email: "",
    password: "",
  });
  
  const handleSignInSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: signInForm.email,
        password: signInForm.password,
      }),
    })
      .then((response) => {
        if (response.ok) {
          // User is authenticated - redirect to the content page
          return response.json();
        } else if (response.status === 401) {
          // Authentication failed - display error message
          alert("Invalid email or password")
          throw new Error("Invalid email or password")  
        } else {
          // Display other error messages returned by the server
          throw new Error(response.statusText);
        }
      })
      .then((data) => {
        setUser(data);
        navigate('/');
      })
      .catch((error) => {
        console.error(error);
      });
  };
  

  const handleSignInFormChange = (event) => {
    const { name, value } = event.target;
    setSignInForm((prevState) => ({ ...prevState, [name]: value }));
  };
 
  function changeAuthMode(e) {
    e.preventDefault();
    window.location.replace('/signup')
 }

  return (
    <div className="login-page">
        <div className="Auth-form-container">
          <form className="Auth-form" onSubmit={handleSignInSubmit}>
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Log In</h3>
              <div className="text-center">
                Not registered yet?{" "}
                <span className="link-primary" onClick={changeAuthMode}>
                  Sign Up
                </span>
              </div>
              <div className="form-group mt-3">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control mt-1"
                  placeholder="Enter email"
                  name="email"
                  value={signInForm.email}
                  onChange={handleSignInFormChange}
                />
              </div>
              <div className="form-group mt-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control mt-1"
                  placeholder="Enter password"
                  name="password"
                  value={signInForm.password}
                  onChange={handleSignInFormChange}
                />
              </div>
              <div className="d-grid gap-2 mt-3">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
              <p className="text-center mt-2"></p>
            </div>
          </form>
        </div>
      </div>
  )
}
