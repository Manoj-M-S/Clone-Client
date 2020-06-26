import React, { useEffect, useState } from "react";
import App from "../App";
import { isAuthenticated } from "../helper/AuthHelper";
import { API } from "../backend";
import { useParams, Redirect } from "react-router-dom";

const UserProfile = () => {
  const [userProfile, setProfile] = useState([]);

  const { user, token } = isAuthenticated();
  const { userId } = useParams();

  useEffect(() => {
    const preload = () => {
      if (user) {
        fetch(`${API}/profile/${userId}`)
          .then((res) => res.json())
          .then((result) => {
            setProfile(result);
          });
      } else {
        return <Redirect to="/signup" />;
      }
    };
    preload();
  });

  const followUser = () => {
    fetch(`${API}/follow`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        username: userProfile.username,
        followId: userId,
        name: user.name,
        id: user._id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const unfollowUser = () => {
    fetch(`${API}/unfollow`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        username: userProfile.username,
        unfollowId: userId,
        name: user.name,
        id: user._id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <App>
      <>
        {isAuthenticated() ? (
          userProfile.profile ? (
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
                    data={userProfile.profile}
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
                </div>
                <div>
                  <h4>{userProfile.username}</h4>
                  <h5>{userProfile.useremail}</h5>
                  <div
                    style={{
                      display: "Flex",
                      justifyContent: "space-between",
                      width: "108%",
                    }}
                  >
                    <h6>{userProfile.posts.length} posts</h6>
                    <h6>{userProfile.followers.length} Followers</h6>
                    <h6>{userProfile.following.length} Following</h6>
                  </div>
                  <div style={{ padding: "10px 0px " }}>
                    {userProfile.followers.includes(user.name) ? (
                      <button
                        className="btn waves-effect waves-light #ff1744 blue accent-3"
                        onClick={() => unfollowUser()}
                      >
                        Unfollow
                      </button>
                    ) : (
                      <button
                        className="btn waves-effect waves-light #ff1744 blue accent-3"
                        onClick={() => followUser()}
                      >
                        Follow
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className="gallery">
                {userProfile.posts.map((item) => {
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
          )
        ) : (
          <Redirect to="/signup" />
        )}

        {/* {!isAuthenticated() && <Redirect to="/signup" />}
        {isAuthenticated() && userProfile.posts ? (
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
                  data={userProfile.profile}
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
              </div>
              <div>
                <h4>{userProfile.username}</h4>
                <h5>{userProfile.useremail}</h5>
                <div
                  style={{
                    display: "Flex",
                    justifyContent: "space-between",
                    width: "108%",
                  }}
                >
                  <h6>{userProfile.posts.length} posts</h6>
                  <h6>{userProfile.followers.length} Followers</h6>
                  <h6>{userProfile.following.length} Following</h6>
                </div>
                <div style={{ padding: "10px 0px " }}>
                  {userProfile.followers.includes(user.name) ? (
                    <button
                      className="btn waves-effect waves-light #ff1744 blue accent-3"
                      onClick={() => unfollowUser()}
                    >
                      Unfollow
                    </button>
                  ) : (
                    <button
                      className="btn waves-effect waves-light #ff1744 blue accent-3"
                      onClick={() => followUser()}
                    >
                      Follow
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="gallery">
              {userProfile.posts.map((item) => {
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
        )} */}
      </>
    </App>
  );
};

export default UserProfile;
