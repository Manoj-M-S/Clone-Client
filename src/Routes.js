import React from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import CreatePost from "./pages/CreatePost";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import UserProfile from "./pages/UserProfile";

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
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
