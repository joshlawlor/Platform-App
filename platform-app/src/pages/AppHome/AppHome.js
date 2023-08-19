import React from "react";
import { getUser } from "../../service/AuthService";
import Navbar from "../Navbar/Navbar";
import "./AppHome.css";
function AppHome() {

  if(getUser() === undefined){
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
