import React from "react";
import {withRouter} from "react-router";

import "./index.css";
class Home extends React.Component {
  render() {
    return (
      <div>
        <main className="container-fluid home" />
      </div>
    );
  }
}

export default withRouter(Home);
