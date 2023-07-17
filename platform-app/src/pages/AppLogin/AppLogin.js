import React from "react";
import { useNavigate } from "react-router-dom";
import { useState , useEffect} from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import dragon from '../../components/images/dragon.png'
import './AppLogin.css'

function AppLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [requestBody, setRequestBody] = useState({});


  const appLogin = (e) => {
    setRequestBody({...requestBody, email, password})
  }
  
  let handleEmail = async (e) => {
    await setEmail(e.target.value);
  };

  let handlePassword = async (e) => {
    await setPassword(e.target.value);
  };

  return (
    <div className="AppOB1-container">
      <div className="back-container">
        <button className="aob1-back-btn" onClick={() => navigate('/')}>
          <AiOutlineArrowLeft className="back-arrow" /> <p>Back</p>
        </button>
      </div>        
      <div className="logo-container">
        <img className="Logo" src={dragon} alt="Logo" />
      </div>
      <div className="AppOB1-body">
        <header className="apploginsub-header">
          <h3>Log in to your Account</h3>
        </header>
        <div className="form-container">
          <form className="AppOB1-form" onSubmit={appLogin}>
            <div className="AppOB1-email form-item">
              <label for="email" className="form-label">
                Your email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                onChange={handleEmail}
                aria-describedby="emailHelp"
                required
              />
            </div>
            <div className="AppLogin-password relative">
              <label for="password" className="form-label">
                Password
              </label>
              <div className="relative">
                <input
                  type={"password"}
                  className="form-control"
                  id="password"
                  placeholder="Enter your password"
                  required
                  onChange={handlePassword}
                  minlength="8"
                />
              </div>
            </div>
            <div className="create-account">
              <button type="submit" className="btn fw-bold createButton">
                Create Account
              </button>
            </div>
          </form>
        </div>
        <div className="login">
          <p className="login-text">
            Don't have an account?
            <span>
              {" "}
              <a href="/register" id="loginLink">
                Register Here
              </a>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AppLogin;
