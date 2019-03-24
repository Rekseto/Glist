import * as React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router";

import Header from "../../components/Header";
import {metricsActions} from "../../state/ducks/metrics";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from "recharts";
import {addDays, getDates} from "../../helpers/dateHelper";
import "./index.css";
const browsersColors = {
  "Google Chrome": "#4689F4",
  Firefox: "#FF6611",
  Opera: "#D81024",
  Edge: "",
  Unknown: ""
};

const colors = ["#4DA0FD", "#C5DEFE", "#8EC2FD", "#FC2847"];

const languagesAbbreviations = {
  "pl-PL": "pl",
  "en-GB": "eng",
  "en-CA": "eng",
  "en-US": "eng",
  "en-AU": "eng"
};

class DashboardCharts extends React.Component {
  render() {
    const colors = ["#4DA0FD", "#C5DEFE", "#8EC2FD", "#FC2847"];

    const {
      logout,
      visitorsDataSet,
      browserDataSet,
      languageDataSet
    } = this.props;
    return (
      <React.Fragment>
        <div className="dashboard__container">
          <Header logout={logout} />
          <main className="main">
            <section className="dashboard__section">
              <h2>Visitors </h2>

              <ResponsiveContainer min-height="100" height="50%" width="70%">
                <LineChart
                  data={visitorsDataSet}
                  margin={{top: 5, right: 30, left: 20, bottom: 5}}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="x" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="linear"
                    dataKey="visitors"
                    stroke="#4689F4"
                    strokeWidth="4"
                  />
                </LineChart>
              </ResponsiveContainer>
            </section>

            <div className="dasboard__doubleSectionContainer">
              <section className="dashboard__section">
                <h2>Browsers</h2>
                <BarChart
                  width={500}
                  height={300}
                  data={browserDataSet}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="browser" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8884d8" barSize={30}>
                    {browserDataSet.map((entry, index) => {
                      return (
                        <Cell key={`cell-${index}`} fill={colors[index]} />
                      );
                    })}
                  </Bar>
                </BarChart>
                <div className="dashboard__chart" />
              </section>
              <section className="dashboard__section">
                <h2>Language</h2>

                <BarChart
                  width={500}
                  height={300}
                  data={languageDataSet}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="language" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8884d8" barSize={30}>
                    {languageDataSet.map((entry, index) => {
                      return (
                        <Cell key={`cell-${index}`} fill={colors[index]} />
                      );
                    })}
                  </Bar>
                </BarChart>
              </section>
            </div>
          </main>
        </div>
      </React.Fragment>
    );
  }
}

export default DashboardCharts;
