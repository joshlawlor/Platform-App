import React from "react";
import { useNavigate } from "react-router-dom";
import { getUser, resetUserSession } from "../../service/AuthService";
import Navbar from "../Navbar/Navbar";
function AppHome() {
  const user = getUser();
  console.log(user);
  const name = user.username !== "undefined" && user ? user.username : "";
  const navigate = useNavigate();

  console.log(sessionStorage.user);

  return (
    <div className="App">
      <Navbar />
      <header className="App-header">
        <h1>Welcome {name}</h1>
        <br />
      </header>
      <div></div>
    </div>
  );
}

export default AppHome;
