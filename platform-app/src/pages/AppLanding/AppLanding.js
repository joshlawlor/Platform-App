import React from "react";
import "./AppLanding.css";
import dagger from "../../components/images/dagger.png";
import { useNavigate } from "react-router-dom";

function AppLanding() {
  const navigate = useNavigate();
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="homeTitle">Dungeons & Dummies</h1>
      </header>
      <div className="landing-castle-wall-container">
        <div className="rampart-container">
          <div className="landing-rampart"></div>
          <div className="landing-rampart"></div>
          <div className="landing-rampart"></div>
          <div className="landing-rampart"></div>
          <div className="landing-rampart"></div>
        </div>
        <div className="landing-castle-wall">
          {/* <img src={dagger} className="App-logo" alt="logo" /> */}
          <div>
            <button onClick={() => navigate("/login")}>Login</button>
            <button onClick={() => navigate("/register")}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppLanding;
