import React, { useState } from "react";
import App from "../App";
import { Link, useHistory } from "react-router-dom";
import { API } from "../backend";
import M from "materialize-css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  let photo = "";
  const history = useHistory();

  const signup = (user) => {
    return fetch(`${API}/signup`, {
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
          M.toast({
            html: "Signup Successful",
            classes: "#43a047 green darken-1",
          });
          setTimeout(() => {
            history.push("/");
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

  const uploadPic = () => {
    if (image) {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "insta-clone");
      data.append("cloud_name", "makarasu");
      fetch("https://api.cloudinary.com/v1_1/makarasu/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          photo = data.url;
        })
        .then(() => signup({ name, email, password, photo }))
        .catch((err) => {
          console.log(err);
        });
    } else {
      signup({ name, email, password });
    }
  };

  return (
    <App>
      <div>
        <div className="signupcard">
          <div className="card auth-card input-field">
            <h2>Instagram</h2>
            <input
              type="text"
              className="input-field"
              placeholder="Username"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              className="input-field"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="input-field"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="file-field input">
              <div className=" btn waves-effect waves-light #ff1744 red accent-3">
                <span>Upload DP</span>
                <input
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>
              <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
              </div>
            </div>
            <button
              className="btn waves-effect waves-light #ff1744 red accent-3"
              onClick={() => uploadPic()}
            >
              Signup
            </button>
            <h6 className="text-lighten-3">
              Already have an account ?
              <Link to="/login" className="link">
                login
              </Link>
            </h6>
          </div>
        </div>
      </div>
    </App>
  );
};

export default Signup;
