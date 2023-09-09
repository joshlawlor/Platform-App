import React from "react";
import axios from "axios";
import "./AppRegister.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
// import { useSignupState } from '../../context/SignUpProvider';
import dragon from "../../assets/images/dragon.png";
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  addDoc,
  collection,
  serverTimestamp,
  doc,
  setDoc,
  createId,
} from "firebase/firestore";

//ENV VARIABLES
const registerURL = process.env.REACT_APP_REGISTER_URL;
const apiKey = process.env.REACT_APP_API_KEY;

function AppRegister() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setpassword2] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  // const [signupState, setSignupState] = useSignupState();

  // useEffect(() => {
  //   console.log(JSON.stringify(signupState));
  // }, [signupState]);

  const appSignup = async (e) => {
    e.preventDefault();
    if (
      username.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      password2.trim() === ""
    ) {
      setErrorMessage("All fields are required");
      return;
    }
    if (password !== password2) {
      setErrorMessage("Passwords must match");
      return;
    }
    setErrorMessage(null);
    const requestConfig = {
      headers: { "Content-Type": "application/json", "x-api-key": apiKey },
    };

    const requestBody = {
      username: username,
      email: email,
      password: password,
    };

    await axios
      .post(registerURL, requestBody, requestConfig)
      .then(() => {
        console.log("Success", password, email);
        setErrorMessage("Registration successful");

        createUserWithEmailAndPassword(auth, email, password)
          .then(() => {
            setErrorMessage("CHAT SUCCESSFUL");
            auth.signOut();
          })
          .catch((error) => {
            console.log(error.message, error.code);
          });

        const userCollectionRef = collection(db, "users");
        const userDocRef = doc(userCollectionRef);
        setDoc(userDocRef, {
          username: username,
          email: email,
          timestamp: serverTimestamp(),
        });

        navigate("/login");
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage(
            "Sorry, the server is experiencing difficulty. Please try again"
          );
        }
        console.log("AXIOS ERROR", error);
      });

    // if (password !== password2) {
    //   await setNotificationState({
    //     open: true,
    //     message: "Passwords must match.",
    //     type: NotificationTypes.error,
    //   });
    //   return;
    // }
  };

  let handleEmail = async (e) => {
    await setEmail(e.target.value);
  };
  let handleUsername = async (e) => {
    await setUsername(e.target.value);
  };

  let handlePassword = async (e) => {
    await setPassword(e.target.value);
  };

  let handlePassword2 = async (e) => {
    await setpassword2(e.target.value);
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
        <header className="appsub-header">
          <h3>Create an account</h3>
        </header>
        <div className="form-container">
          <form className="AppOB1-form" onSubmit={appSignup}>
            <div className="AppOB1-email form-item">
              <label for="email" className="form-label">
                Your username
              </label>
              <input
                type="username"
                className="form-control"
                id="username"
                placeholder="Enter your username"
                onChange={handleUsername}
                aria-describedby="emailHelp"
                required
              />
            </div>
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
          {errorMessage && <p className="errorMessage">{errorMessage}</p>}
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
