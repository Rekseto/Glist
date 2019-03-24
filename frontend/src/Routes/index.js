import React from "react";
import {Route, Switch} from "react-router-dom";
import Applied from "./AppliedRoute";
import UnauthenticatedRoute from "./UnauthenticatedRoute";
import AuthenticatedRoute from "./AuthenticatedRoute";
import Loadable from "../LoadableComponent";

const Dashboard = Loadable({
  loader: () => import("../container/Dashboard")
});

const LoginPage = Loadable({
  loader: () => import("../container/LoginPage")
});

export default props => {
  return (
    <Switch>
      <UnauthenticatedRoute
        path="/"
        to="/dashboard"
        exact
        component={LoginPage}
        props={props}
      />
      <AuthenticatedRoute
        path="/dashboard"
        exact
        component={Dashboard}
        props={props}
      />
    </Switch>
  );
};
