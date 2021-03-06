import React, { useEffect, useState } from "react";
import App from "../App";
import { isAuthenticated } from "../helper/AuthHelper";
import { API } from "../backend";
import M from "materialize-css";

import { Redirect, useParams, useHistory } from "react-router-dom";
const Post = () => {
  const [pics, setPics] = useState([]);
  const { user, token } = isAuthenticated();
  const { postId } = useParams();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const history = useHistory();

  useEffect(() => {
    fetch(`${API}/post/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setPics(result);
        setTitle(result.title);
        setBody(result.body);
        setImage(result.photo);
      });
  }, [postId, token]);

  let photo = "";
  const UpdatePost = () => {
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
        photo = data.secure_url;
      })
      .then(() => Update(title, body, photo, token, postId))
      .catch((err) => {
        console.log(err);
      });
  };
  const Update = (title, body, photo, token, postId) => {
    fetch(`${API}/post/update/${postId}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        photo: photo,
        title: title,
        body: body,
        postId: postId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          M.toast({
            html: "Post Updated Successful",
            classes: "#43a047 green darken-1",
          });
          setTimeout(() => {
            history.push(`/profile`);
          }, 1000);
        } else {
          M.toast({
            html: data.error,
            classes: "#c62828 red darken-2",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <App>
      {isAuthenticated() ? (
        user.name === pics.postedBy ? (
          <div className="card home-card">
            <h5 style={{ padding: "7px" }}>Edit Post</h5>
            <div className="card-image">
              <img alt={pics.title} src={pics.photo} />
            </div>
            <div className="card-content">
              <h5>
                <b>Title : </b>
                {pics.title}
              </h5>
              <h5>
                <b>Body :</b> {pics.body}
              </h5>
            </div>
            <div className="card field">
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                type="text"
                placeholder="Body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
              <div className="file-field input">
                <div className=" btn waves-effect waves-light #ff1744 red accent-3">
                  <span>Upload Image</span>
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
                onClick={() => UpdatePost()}
              >
                Update Post
              </button>
            </div>
          </div>
        ) : (
          <h2>Loading!</h2>
        )
      ) : (
        <Redirect to="/signup" />
      )}
    </App>
  );
};

export default Post;
