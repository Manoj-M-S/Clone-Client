import React, { useEffect, useState } from "react";
import App from "../App";
import { isAuthenticated } from "../helper/AuthHelper";
import { API } from "../backend";

const Profile = () => {
  const [mypics, setPics] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  const { user, token } = isAuthenticated();

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
        console.log(result);
      })
      .then(
        fetch(`${API}/profile/${user._id}`)
          .then((res) => res.json())
          .then((result) => {
            console.log(result);
            setFollowers(result.followers);
            setFollowing(result.following);
          })
      );
  };

  return (
    <App>
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
              data="https://images.pexels.com/photos/2599039/pexels-photo-2599039.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              style={{ width: "160px", height: "160px", borderRadius: "80px" }}
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
              <h6>{followers.length} Followers</h6>
              <h6>{following.length} Following</h6>
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
    </App>
  );
};

export default Profile;
