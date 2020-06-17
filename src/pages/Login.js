import React, { useState } from "react";
import App from "../App";
import { login } from "../helper/AuthHelper";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signupform = () => {
    return (
      <div>
        <div className="logincard">
          <div className="card auth-card input-field">
            <h2>Instagram</h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="btn waves-effect waves-light #ff1744 red accent-3"
              onClick={() => login({ email, password })}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    );
  };
  return <App>{signupform()}</App>;
};

export default Login;
