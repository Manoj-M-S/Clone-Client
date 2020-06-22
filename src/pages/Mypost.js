import React, { useEffect, useState } from "react";
import App from "../App";
import { isAuthenticated } from "../helper/AuthHelper";
import { API } from "../backend";
import { Redirect, Link, useParams } from "react-router-dom";
import { Update } from "../helper/PostHelper";
const Post = () => {
  const [pics, setPics] = useState([]);
  const { user, token } = isAuthenticated();
  const { postId } = useParams();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    preload();
  }, []);

  const preload = () => {
    fetch(`${API}/post/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setPics(result);
      });
  };

  let photo = "";
  console.log(postId);
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
        photo = data.url;
      })
      .then(() => Update(title, body, photo, token, postId))
      .catch((err) => {
        console.log(err);
      });
  };

  //   const likePost = (id) => {
  //     fetch(`${API}/like`, {
  //       method: "put",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify({
  //         postId: id,
  //         userId: user.name,
  //       }),
  //     })
  //       .then((res) => res.json())
  //       .then((result) => {
  //         const newData = pics.map((item) => {
  //           if (item._id === result._id) {
  //             return result;
  //           } else {
  //             return item;
  //           }
  //         });
  //         setPics(newData);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   };

  //   const unlikePost = (id) => {
  //     fetch(`${API}/unlike`, {
  //       method: "put",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify({
  //         postId: id,
  //         userId: user.name,
  //       }),
  //     })
  //       .then((res) => res.json())
  //       .then((result) => {
  //         const newData = pics.map((item) => {
  //           if (item._id === result._id) {
  //             return result;
  //           } else {
  //             return item;
  //           }
  //         });
  //         setPics(newData);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   };

  //   const deletePost = (postid) => {
  //     fetch(`${API}/post/delete/${user._id}/${postid}`, {
  //       method: "delete",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((result) => {
  //         const newData = pics.filter((item) => {
  //           return item._id !== result._id;
  //         });
  //         setPics(newData);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   };

  //   const makeComment = (text, id) => {
  //     fetch(`${API}/comment`, {
  //       method: "put",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify({
  //         text: text,
  //         postId: id,
  //         userName: user.name,
  //       }),
  //     })
  //       .then((res) => res.json())
  //       .then((result) => {
  //         console.log(result);
  //         const newData = pics.map((item) => {
  //           if (item._id === result._id) {
  //             return result;
  //           } else {
  //             return item;
  //           }
  //         });
  //         setPics(newData);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   };

  //   const deleteComment = (cId, id) => {
  //     fetch(`${API}/comment/delete`, {
  //       method: "put",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify({
  //         commentId: cId,
  //         postId: id,
  //       }),
  //     })
  //       .then((res) => res.json())
  //       .then((result) => {
  //         console.log(result);
  //         const newData = pics.map((item) => {
  //           if (item._id === result._id) {
  //             return result;
  //           } else {
  //             return item;
  //           }
  //         });
  //         setPics(newData);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   };
  return (
    <App>
      {!isAuthenticated() && <Redirect to="/signup" />}
      {isAuthenticated() && user.name === pics.postedBy && (
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
      )}
    </App>
  );
};

export default Post;
