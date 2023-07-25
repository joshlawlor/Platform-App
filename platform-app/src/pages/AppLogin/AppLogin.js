import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import dragon from "../../components/images/dragon.png";
import "./AppLogin.css";

const loginURL = process.env.REACT_APP_LOGIN_URL


function AppLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [requestBody, setRequestBody] = useState({});

  // useEffect(() => {
  //   console.log(requestBody);
  // }, [requestBody]);

  const requestConfig = {
    headers: { 'Content-Type': 'application/json',
    'x-api-key': 'eddiDzFpPE96dk5VsqKKb7IUVhyLDx9FaBMdiatz' },
  }


  const appLogin = async(e) => {
    e.preventDefault();
    // await setRequestBody({...requestBody, email, password })
    const requestBody = {
      email: email,
      password: password
    }

    axios.post(loginURL, requestBody, requestConfig)
    .then((response) => {
      console.log(response)
    })
  };

  let handleEmail = async (e) => {
    await setEmail(e.target.value);
  };

  let handlePassword = async (e) => {
    await setPassword(e.target.value);
  };

  return (
    <div className="AppOB1-container">
      <div className="back-container">
        <button className="aob1-back-btn" onClick={() => navigate("/")}>
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
              <label for="username" className="form-label">
                Your email
              </label>
              <input
                type="text"
                className="form-control"
                id="text"
                placeholder="Enter your email"
                onChange={handleEmail}
                aria-describedby="emailHelp"
                
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
