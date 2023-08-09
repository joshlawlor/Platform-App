import React from "react";
import "./AppLanding.css";
import dagger from "../../components/images/dagger.png";
import BANNER from "../../components/images/BANNER.png";
import { useNavigate } from "react-router-dom";

function AppLanding() {
  const navigate = useNavigate();
  return (
    <div className="App-Landing">
      <header className="App-header">
        {/* <img src={dagger} className="App-logo" alt="logo" /> */}

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
          <div className="left-Gate">
            <div className="left-Banner">
              <div className="banner-image">
              <img
                  className="center"
                  onClick={() => navigate("/register")}
                  src={BANNER}
                ></img>
                <div class="banner-Text">SIGN UP</div>
              </div>
            </div>
          </div>
          <div className="gate-container">
            <div className="gate-image"></div>
          </div>
          <div className="right-Gate">
            <div className="right-Banner">
              <div className="banner-image">
                <img
                  className="center"
                  onClick={() => navigate("/login")}
                  src={BANNER}
                ></img>
                <div class="banner-Text">LOG IN</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="animatedBackground"></div>
    </div>
  );
}

export default AppLanding;
