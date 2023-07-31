import React from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <h1 className="navTitle">Dungeons & Dummies</h1>
      <button onClick={() => navigate("/home")}>Home</button>
      <button onClick={() => navigate("/profile")}>Profile</button>
      <button onClick={() => navigate("/chat")}>Chat</button>
    </div>
  );
}
