import React from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import {  resetUserSession } from "../../service/AuthService";
import {auth} from '../../firebase';
export default function Navbar() {
  const navigate = useNavigate();

  //CHAT LOGOUT
  // const signOut = () => {
  //   signOut(auth)
  // }
  const logoutHandler = () => {
    auth.signOut()
    resetUserSession();
    navigate("/");
  };
  return (
    <div className="navbar">
      <h1 className="navTitle">Dungeons & Dummies</h1>
      <button class="btn" onClick={() => navigate("/home")}>Home</button>
      <button class="btn" onClick={() => navigate("/chat")}>Chat</button>
      <button class="btn" onClick={() => navigate("/profile")}>Profile</button>
      <button class="btn" onClick={logoutHandler}> Logout</button>
    </div>
  );
}
