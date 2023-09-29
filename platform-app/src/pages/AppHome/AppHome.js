import React from "react";
import { getUser } from "../../service/AuthService";
import Navbar from "../Navbar/Navbar";
import "./AppHome.css";
function AppHome() {
  const user = getUser();
  const username = user ? user.username : "Guest";

  return (
    <div className="AppHome">
      <Navbar />
      <header className="App-header">
        {user ? (
          <h1 className="home-title">Welcome {username} </h1>
        ) : (
          <h1 className="home-title">Welcome</h1>
        )}
        <div className="campaign-menu">
          <button>Create a Campaign</button>
        </div>
      </header>
      <div className="campaign-display-container">
        <h1>Campaign containers</h1>
      </div>
    </div>
  );
}

export default AppHome;
