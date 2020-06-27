import React, { useState } from "react";
import App from "../App";
import { API } from "../backend";
import M from "materialize-css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signupform = () => {
    const login = (user) => {
      return fetch(`${API}/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (!data.error) {
            localStorage.setItem("loggedIn", JSON.stringify(data));
            M.toast({
              html: "Login Successful",
              classes: "#43a047 green darken-1",
            });
            setTimeout(() => {
              window.location.href = "/";
            }, 250);
          } else {
            M.toast({
              html: data.error,
              classes: "#c62828 red darken-2",
            });
          }
        })
        .catch((error) => console.log(error));
    };
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
