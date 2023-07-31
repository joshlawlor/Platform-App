import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
function AppHome() {
  const navigate = useNavigate();
  return (
    <div className="App">
      <Navbar />

      <header className="App-header">
        <h1 className="homeTitle">Dungeons & Dummies</h1>
        <br />
      </header>
      <div></div>
    </div>
  );
}

export default AppHome;
