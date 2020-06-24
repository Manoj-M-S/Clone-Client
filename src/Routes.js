import React from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import CreatePost from "./pages/CreatePost";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import UserProfile from "./pages/UserProfile";
import Post from "./pages/Mypost";
import Following from "./pages/FollowingPost";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/login" exact component={Login} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/create" exact component={CreatePost} />
        <Route path="/profile/:userId" exact component={UserProfile} />
        <Route path="/editpost/:postId" exact component={Post} />
        <Route path="/following" exact component={Following} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
