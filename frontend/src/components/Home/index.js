import React from "react";
import {withRouter} from "react-router";
import Header from "../Header";
import VisitorsChart from "../../container/VisitorsChart";
import "./index.css";
class Home extends React.Component {
  render() {
    return (
      <div className="container">
        <Header />
        <main className="">
          <VisitorsChart />
        </main>
      </div>
    );
  }
}

export default withRouter(Home);
