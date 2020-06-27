import React, { useEffect, useState } from "react";
import App from "../App";
import { isAuthenticated } from "../helper/AuthHelper";
import { updateProfilePic } from "../helper/PostHelper";
import { API } from "../backend";
import M from "materialize-css";
import { Redirect, Link } from "react-router-dom";

const Profile = () => {
  const [mypics, setPics] = useState([]);
  const [userDetails, setDetails] = useState([]);
  const [dp, setDp] = useState([]);
  const { user, token } = isAuthenticated();
  const [image, setImage] = useState("");

  useEffect(() => {
    let photo = "";
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
          photo = data.secure_url;
          setDp(data.secure_url);
          M.toast({
            html: "Picture Updated Successfully",
            classes: "#43a047 green darken-1",
          });
        })
        .then(() => updateProfilePic(photo))
        .catch((err) => {
          console.log(err);
        });
    }
  }, [image]);

  const updatePic = (file) => {
    setImage(file);
  };

  useEffect(() => {
    const preload = () => {
      if (user) {
        fetch(`${API}/myposts/${user._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => res.json())
          .then((result) => {
            setPics(result);
          })
          .then(
            fetch(`${API}/profile/${user._id}`)
              .then((res) => res.json())
              .then((result) => {
                setDetails(result);
                setDp(result.profile);
              })
          );
      } else {
        return <Redirect to="/signup" />;
      }
    };
    preload();
  }, []);

  const deletePost = (postid) => {
    fetch(`${API}/post/delete/${user._id}/${postid}`, {
      method: "delete",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = mypics.filter((item) => {
          return item._id !== result._id;
        });
        setPics(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <App>
      {isAuthenticated() ? (
        userDetails.profile && dp.length > 0 ? (
          <div style={{ maxWidth: "550px", margin: "0px auto" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                margin: "18px 0px",
                borderBottom: "1px solid grey",
              }}
            >
              <div>
                <object
                  data={dp}
                  style={{
                    width: "160px",
                    height: "160px",
                    borderRadius: "80px",
                  }}
                >
                  <img
                    style={{
                      width: "160px",
                      height: "160px",
                      borderRadius: "80px",
                    }}
                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                    alt=""
                  />
                </object>
                <div className="file-field input">
                  <div className=" btn waves-effect waves-light #ff1744 red accent-3">
                    <span>Update DP</span>
                    <input
                      type="file"
                      onChange={(e) => updatePic(e.target.files[0])}
                    />
                  </div>
                  <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                  </div>
                </div>
              </div>
              <div>
                <h4>{user.name}</h4>
                <h5>{user.email}</h5>

                <div
                  style={{
                    display: "Flex",
                    justifyContent: "space-between",
                    width: "108%",
                  }}
                >
                  <h6>{mypics.length} Post</h6>
                  <h6>{userDetails.followers.length} Followers</h6>
                  <h6>{userDetails.following.length} Following</h6>
                </div>
              </div>
            </div>
            <div className="gallery">
              {mypics.map((item) => {
                return (
                  <div key={item._id}>
                    <div className="card profile-card">
                      <div className="card-content">
                        <div className="card-image">
                          <img
                            key={item._id}
                            className="item"
                            alt={item.title}
                            src={item.photo}
                          />
                        </div>
                        <i
                          className="material-icons"
                          style={{ float: "right" }}
                          onClick={() => {
                            deletePost(item._id);
                          }}
                        >
                          delete
                        </i>
                        <i className="material-icons" style={{ float: "left" }}>
                          <Link to={`/editpost/${item._id}/`}>create </Link>
                        </i>
                      </div>
                    </div>
                  </div>
                );
              })}
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

export default Profile;
