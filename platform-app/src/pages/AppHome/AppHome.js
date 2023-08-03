
import React from "react";
import { useNavigate } from "react-router-dom";
import {getUser, resetUserSession} from '../../service/AuthService';
import Navbar from "../Navbar/Navbar";
function AppHome() {
const user = getUser();
  console.log(user);
  const name = user.username !== 'undefined' && user ? user.username : '';
  const navigate = useNavigate();

  console.log(sessionStorage.user)
 const logoutHandler = () => {
    resetUserSession();
    navigate('/login')
  }
  return (
    <div className="App">
      <Navbar />
<button onClick={logoutHandler}>LOGOUT</button>
      <header className="App-header">
        <br />
      </header>
      <div></div>
    </div>
  );

}

export default AppHome;
