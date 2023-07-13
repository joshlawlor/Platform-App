import React from "react";
import './AppRegister.css'
import { useNavigate } from "react-router-dom";
import { useState , useEffect} from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useSignupState } from '../../context/SignUpProvider';

function AppRegister() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setpassword2] = useState("");
  const [signupState, setSignupState] = useSignupState();

  useEffect(() => {
    console.log(JSON.stringify(signupState));
  }, [signupState]);

  const appSignup = async (e) => {
    //REMOVE AFTER TESTING IS FINISHED
    e.preventDefault();
    
    // if (password !== password2) {
    //   await setNotificationState({
    //     open: true,
    //     message: "Passwords must match.",
    //     type: NotificationTypes.error,
    //   });
    //   return;
    // }
    setSignupState({ ...signupState, email, password });
  };

  let handleEmail = async (e) => {
    await setEmail(e.target.value);
  };

  let handlePassword = async (e) => {
    await setPassword(e.target.value);
  };

  let handlePassword2 = async (e) => {
    await setpassword2(e.target.value);
  };
  return (
    // <div>
    //   <button onClick={() => navigate("/")}>BACK</button>
    //   <h1>REGISTRATION PAGE</h1>
    // </div>


  
    
      <div className="AppOB1-container">
        <div className="back-container">
          <button className="aob1-back-btn" onClick={() => navigate('/')}>
            <AiOutlineArrowLeft className="back-arrow" /> <p>Back</p>
          </button>
        </div>        
        {/* <div className="logo-container">
          <img className="Logo" src={logo} alt="Logo" />
        </div> */}
        <div className="AppOB1-body">
          <header className="appsub-header">
            <h3>Create an account</h3>
          </header>
          <div className="form-container">
            <form className="AppOB1-form" onSubmit={appSignup}>
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
              <div className="AppOB1-password relative">
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
              <div className="AppOB1-confirm relative">
                <label for="confirmPassword" className="form-label">
                  Repeat password
                </label>
                <div className="relative">
                  <input
                    type={"password"}
                    className="form-control"
                    id="confirmPassword"
                    placeholder="Enter your password again"
                    required
                    onChange={handlePassword2}
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
              Already have an account?
              <span>
                {" "}
                <a href="/login" id="loginLink">
                  Log In
                </a>
              </span>
            </p>
          </div>
        </div>
      </div>
    );
}

export default AppRegister;