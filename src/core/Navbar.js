import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { logout, isAuthenticated } from "../helper/AuthHelper";

const NavBar = () => {
  return (
    <nav>
      <div className="nav-wrapper white">
        {isAuthenticated() ? (
          <Link to="/" className="brand-logo left">
            Instagram
          </Link>
        ) : (
          <div className="brand-logo left ">Instagram</div>
        )}

        <ul id="nav-mobile" className="right">
          {!isAuthenticated() && (
            <Fragment>
              <li>
                <Link to="/signup" className="brand">
                  Signup
                </Link>
              </li>
              <li>
                <Link to="/login" className="brand">
                  Login
                </Link>
              </li>
            </Fragment>
          )}

          {isAuthenticated() && (
            <Fragment>
              <li>
                <Link to="/profile" className="brand">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/following" className="brand">
                  Following Posts
                </Link>
              </li>
              <li>
                <Link to="/create" className="brand">
                  Create Post
                </Link>
              </li>

              <li>
                <button
                  className="btn waves-effect waves-light #ff1744 red darken-1"
                  onClick={() => logout()}
                >
                  logout
                </button>
              </li>
            </Fragment>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
