import React, { useEffect, useState } from "react";
import App from "../App";
import { isAuthenticated } from "../helper/AuthHelper";
import { API } from "../backend";
import { Redirect, Link } from "react-router-dom";

const Home = () => {
  const [pics, setPics] = useState([]);
  const { user, token } = isAuthenticated();

  useEffect(() => {
    const preload = () => {
      fetch(`${API}/posts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((result) => {
          setPics(result);
        });
    };
    preload();
  }, [token]);

  const likePost = (id) => {
    fetch(`${API}/like`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        postId: id,
        userId: user.name,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = pics.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setPics(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const unlikePost = (id) => {
    fetch(`${API}/unlike`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        postId: id,
        userId: user.name,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = pics.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setPics(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deletePost = (postid) => {
    fetch(`${API}/post/delete/${user._id}/${postid}`, {
      method: "delete",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = pics.filter((item) => {
          return item._id !== result._id;
        });
        setPics(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const makeComment = (text, id) => {
    fetch(`${API}/comment`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        text: text,
        postId: id,
        userName: user.name,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = pics.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setPics(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteComment = (cId, id) => {
    fetch(`${API}/comment/delete`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        commentId: cId,
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = pics.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setPics(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <App>
      {!isAuthenticated() && <Redirect to="/signup" />}
      {isAuthenticated() &&
        pics.map((item) => {
          return (
            <div key={item._id}>
              <div className="card home-card">
                <span className="card-title">
                  <h5 style={{ padding: "7px" }}>
                    <Link
                      to={
                        item.userId !== user._id
                          ? `/profile/${item.userId}`
                          : `/profile`
                      }
                    >
                      {item.postedBy}
                    </Link>
                    {item.postedBy === user.name && (
                      <i
                        className="material-icons"
                        style={{ float: "right" }}
                        onClick={() => {
                          deletePost(item._id);
                        }}
                      >
                        delete
                      </i>
                    )}
                  </h5>
                  {/* <h6 style={{ padding: "10px" }}>{item.createdAt}</h6> */}
                </span>
                <div className="card-image">
                  <img alt={item.title} src={item.photo} />
                </div>
                <div className="card-content">
                  {item.like.includes(user.name) ? (
                    <i
                      className="material-icons"
                      onClick={() => {
                        unlikePost(item._id);
                      }}
                    >
                      thumb_down
                    </i>
                  ) : (
                    <i
                      className="material-icons"
                      onClick={() => {
                        likePost(item._id);
                      }}
                    >
                      thumb_up
                    </i>
                  )}

                  <h6>{item.like.length} Likes</h6>
                  <h6>
                    <b>Title : </b>
                    {item.title}
                  </h6>
                  <h6>
                    <b>Body :</b> {item.body}
                  </h6>
                  {item.comment.map((record) => {
                    return (
                      <h6 key={record._id}>
                        <span style={{ fontWeight: "500" }}>
                          <b>{record.postedBy} : </b>
                        </span>
                        {record.text}
                        {record.postedBy === user.name && (
                          <i
                            className="material-icons"
                            style={{ float: "right" }}
                            onClick={() => {
                              deleteComment(record._id, item._id);
                            }}
                          >
                            delete
                          </i>
                        )}
                      </h6>
                    );
                  })}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      makeComment(e.target[0].value, item._id);
                    }}
                  >
                    <input type="text" placeholder="add a comment" />
                  </form>
                </div>
              </div>
            </div>
          );
        })}
    </App>
  );
};

export default Home;
