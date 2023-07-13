import {React, useState} from "react";
import { useNavigate, Link } from "react-router-dom";

function AppLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [requestBody, setRequestBody] = useState({});


  const submitHandler = (e) => {
    setRequestBody({...requestBody, email, password})
  }

  return (
    <div className="login-container">
      <form className="formlog" onSubmit={submitHandler}>
        <div className="login-header">
          <div className="title">Log in to access your account</div>
        </div>
        <label>
          email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="relative">
          Password:
          <div className="relative">
            <input
              type={"password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </label>
        <br></br>
        <button type="submit" value="Login">
          Log in
        </button>
      </form>
      <footer className="footer">
        <h5 className="register">
          Need to signup for an account?{" "}
          <Link to="/register" id="registerLink">
            <strong>Register Here</strong>
          </Link>
        </h5>
      </footer>
    </div>
  );
}

export default AppLogin;
