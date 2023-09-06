import React, { useState } from "react";
import { getUser } from "../../service/AuthService";
import Navbar from "../Navbar/Navbar";
import "./AppHome.css";
function AppHome() {

    const user = getUser();
    console.log(user);
    const [username, setUsername] = useState("Guest")
    if(user){
      setUsername(user.username);
    }
    const name = username

  
  console.log(sessionStorage.user);

  return (
    <div className="AppHome">
      <Navbar />
      <header className="App-header">
        {user ? <h1 className="home-title">Welcome {name} </h1> : <h1 className="home-title">Welcome</h1> }
        <div className="castle-wall-container">
          
            
          </div>
      </header>
    </div>
  );
}

export default AppHome;
