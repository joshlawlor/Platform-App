import React from "react";
import { useNavigate } from "react-router-dom";
import { getUser, resetUserSession } from "../../service/AuthService";
import Navbar from "../Navbar/Navbar";
import "./AppHome.css";
import { Card, Container } from "react-bootstrap";
function AppHome() {
  const navigate = useNavigate();

  if(getUser() == undefined){
    console.log(getUser())
    console.log('NO USER')
    window.location.replace('/');
  }
    const user = getUser();
    console.log(user);
    const name = user.username !== "undefined" && user ? user.username : "";
    

  
  console.log(sessionStorage.user);

  return (
    <div className="AppHome">
      <Navbar />
      <header className="App-header">
        <h1 className="home-title">Welcome {name} </h1>
        <div className="castle-wall-container">
          
            
          </div>
      </header>
    </div>
  );
}

export default AppHome;
