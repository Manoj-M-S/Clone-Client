import React, { useState } from "react";
import App from "../App";
import { isAuthenticated } from "../helper/AuthHelper";
import { API } from "../backend";
import { CreateaPost } from "../helper/PostHelper";
import { useHistory } from "react-router-dom";

const CreatePost = () => {
  const history = useHistory();
  const { user, token } = isAuthenticated();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const postedBy = user.name;
  const userId = user._id;
  let photo = "";

  const PostDetails = () => {
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
        console.log(data);
        photo = data.secure_url;
      })
      .then(() =>
        CreateaPost(photo, postedBy, API, user, token, title, body, userId)
      )
      .then(() =>
        setTimeout(() => {
          history.push("/");
        }, 2500)
      )
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <App>
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
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
        </div>
        <button
          className="btn waves-effect waves-light #ff1744 red accent-3"
          onClick={() => PostDetails()}
        >
          Submit Post
        </button>
      </div>
    </App>
  );
};

export default CreatePost;
