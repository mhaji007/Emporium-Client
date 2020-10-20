import { API } from "../config";

//==== Signup ====//

export const signup = (user) => {
  // console.log(name, email, password);
  return fetch(`${API}/signup`, {
    method: "POST",
    headers: {
      // Media type accepted by the browser
      Accept: "application/json",
      // Media type sent by the browser
      "Content-Type": "application/json",
    },
    // transform user object to
    // JSON string
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .catch((err) => {
      console.log(err);
    });
};

//================//

//==== Signin ====//

export const signin = (user) => {
  // console.log(name, email, password);
  return fetch(`${API}/signin`, {
    method: "POST",
    headers: {
      // Media type accepted by the browser
      Accept: "application/json",
      // Media type sent by the browser
      "Content-Type": "application/json",
    },
    // transform user object to
    // JSON string
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .catch((err) => {
      console.log(err);
    });
};

//=================//

//==== Signout ====//

export const signout = (next) => {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem("jwt");
    next();
    return fetch(`${API}/signout`, {
      method: "GET",
    })
      .then((response) => {
        console.log("signout", response);
      })
      .catch((err) => console.log(err));
  }
};

//============//

//==== Set and retrieve user infromation to/from local storage ====//

// Used for setting user information in local storage
export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    console.log(JSON.stringify(data));
    window.localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

// Used for confirming authentication (retrieving user information from local storage)
export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (window.localStorage.getItem("jwt")) {
    // Transform JSON string to Javascript object
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};

//====================================================================================//
