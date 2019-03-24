import React from "react";
import {Route, Redirect} from "react-router-dom";

export default ({component: C, props: cProps, ...rest}) => {
  return (
    <Route
      {...rest}
      render={props =>
        cProps.isLogged ? (
          <C user={cProps.user} {...props} {...cProps} />
        ) : (
          <Redirect
            to={`/?redirect=${props.location.pathname}${props.location.search}`}
          />
        )
      }
    />
  );
};
