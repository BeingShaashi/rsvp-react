import React from "react";
import { Redirect, Route } from "react-router-dom";

const RedirectRoute = ({ pathname = "/dashboard", ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => (
        <Redirect
          to={{
            pathname: pathname,
            state: { from: props.location },
          }}
        />
      )}
    />
  );
};

export default RedirectRoute;
