import React, { useEffect, useState } from "react";
import App from "../App";
import { isAuthenticated } from "../helper/AuthHelper";
import { updateProfilePic } from "../helper/PostHelper";
import { API } from "../backend";
import M from "materialize-css";

const Profile = () => {
  const [mypics, setPics] = useState([]);
  const [userDetails, setDetails] = useState([]);
  const [dp, setDp] = useState([]);
  const { user, token } = isAuthenticated();
  const [image, setImage] = useState("");
  let photo = "";

  useEffect(() => {
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
          window.location.reload();

          photo = data.url;
          setDp(data.url);
          M.toast({
            html: "Picture Updated Successfully",
            classes: "#43a047 green darken-1",
          });
        })
        .then(() => updateProfilePic(photo, API, user, token))
        .catch((err) => {
          console.log(err);
        });
    }
  }, [image]);

  const updatePic = (file) => {
    setImage(file);
  };

  useEffect(() => {
    preload();
  }, []);

  const preload = () => {
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
            console.log(result);
            setDetails(result);
            setDp(result.profile);
          })
      );
  };

  return (
    <App>
      {userDetails.username && dp.length > 0 ? (
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
                <img
                  key={item._id}
                  className="item"
                  alt={item.title}
                  src={item.photo}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <h2>Loading!</h2>
      )}
    </App>
  );
};

export default Profile;
