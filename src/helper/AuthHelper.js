import { API } from "../backend";
import M from "materialize-css";

export const signup = (user) => {
  return fetch(`${API}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (!data.error) {
        M.toast({
          html: "Signup Successful",
          classes: "#43a047 green darken-1",
        });
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      } else {
        M.toast({
          html: data.error,
          classes: "#c62828 red darken-2",
        });
      }
    })
    .catch((error) => console.log(error));
};

export const login = (user) => {
  return fetch(`${API}/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (!data.error) {
        localStorage.setItem("loggedIn", JSON.stringify(data));
        M.toast({
          html: "Login Successful",
          classes: "#43a047 green darken-1",
        });
        setTimeout(() => {
          window.location.href = "/";
        }, 250);
      } else {
        M.toast({
          html: data.error,
          classes: "#c62828 red darken-2",
        });
      }
    })
    .catch((error) => console.log(error));
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("loggedIn")) {
    return JSON.parse(localStorage.getItem("loggedIn"));
  } else {
    return false;
  }
};

export const logout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("loggedIn");

    return fetch(`${API}/logout`, {
      method: "GET",
    })
      .then(() =>
        setTimeout(() => {
          window.location.href = "/signup";
        }, 1000)
      )
      .catch((error) => console.log(error));
  }
};
