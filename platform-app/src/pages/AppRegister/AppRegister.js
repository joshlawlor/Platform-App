import React from "react";
import { useNavigate } from "react-router-dom";

function AppRegister() {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate("/")}>BACK</button>
      <h1>REGISTRATION PAGE</h1>
    </div>
  );
}

export default AppRegister;