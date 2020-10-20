import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "./index";

// component is the component(page) passed in
// (here the signin page) renamed to Component
// rest is props of the component being passed
// like path, exact, history (if it's a route component) and all other props
// component is renamed to Component since we don't know what
// kind of component is to be rendered
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/signin",
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

export default PrivateRoute;
