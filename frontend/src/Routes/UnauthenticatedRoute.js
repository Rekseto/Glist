import * as React from "react";
import {Route, Redirect} from "react-router-dom";
import {querystring} from "../helpers/query";

export default ({component: Container, ...rest}) => {
  const redirect = querystring("redirect");
  const {to} = rest;
  return (
    <Route
      {...rest}
      render={props =>
        !rest.props.isLogged ? (
          <Container {...props} {...rest} />
        ) : (
          <Redirect to={redirect === "" || redirect === null ? to : redirect} />
        )
      }
    />
  );
};
