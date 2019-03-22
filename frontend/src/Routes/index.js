import React from "react";
import {Route, Switch} from "react-router-dom";
import Applied from "./AppliedRoute";
import UnauthenticatedRoute from "./UnauthenticatedRoute";
import AuthenticatedRoute from "./AuthenticatedRoute";
import Loadable from "../LoadableComponent";

const Home = Loadable({
  loader: () => import("../components/Home")
});

export default props => {
  return (
    <Switch>
      <Applied path="/" exact component={Home} props={props} />
    </Switch>
  );
};
