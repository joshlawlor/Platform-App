import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
function AppHome() {
  const navigate = useNavigate();

  console.log(sessionStorage.user)

  return (
    <div className="App">
      <Navbar />

      <header className="App-header">
        <br />
      </header>
      <div></div>
    </div>
  );
}

export default AppHome;
