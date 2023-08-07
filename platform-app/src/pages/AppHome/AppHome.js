import React from "react";
import { useNavigate } from "react-router-dom";
import { getUser, resetUserSession } from "../../service/AuthService";
import Navbar from "../Navbar/Navbar";
import "./AppHome.css";
import { Card, Container } from "react-bootstrap";
function AppHome() {
  const user = getUser();
  console.log(user);
  const name = user.username !== "undefined" && user ? user.username : "";
  const navigate = useNavigate();

  console.log(sessionStorage.user);

  return (
    <div className="AppHome">
      <Navbar />
      <header className="App-header">
        <h1>Welcome {name}</h1>
        <div className="castle-wall-container">
          <div className="rampart-container">
            <div className="rampart">
              <h1>rampart 1</h1>
            </div>
            <div className="rampart">
              <h1>rampart 2</h1>
            </div>
            <div className="rampart">
              <h1>rampart 2</h1>
            </div>
            <div className="rampart">
              <h1>rampart 2</h1>
            </div>
            <div className="rampart">
              <h1>rampart 2</h1>
            </div>
            <div className="rampart">
              <h1>rampart 2</h1>
            </div>
          </div>

          <div className="castle-wall">
            <div className="forum-container">
              <div className="forum-header">
                <h2>Make a Post</h2>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default AppHome;
