import React from "react";
import { useNavigate } from "react-router-dom";

function AppLogin() {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate("/")}>BACK</button>
      <h1>LOGIN PAGE</h1>
    </div>
  );
}

export default AppLogin;
