import * as React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router";
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
import {
  addDays,
  formatDate,
  getDates,
  monthNames
} from "../../helpers/dateHelper";
import "./index.css";
const browsersColors = {
  "Google Chrome": "#4689F4",
  Firefox: "#FF6611",
  Opera: "#D81024",
  Edge: "",
  Unknown: ""
};

class VisitorsChart extends React.Component {
  componentDidMount() {
    const today = new Date();
    this.props.fetchMetrics({
      startingDate: addDays(today, -30),
      endingDate: today
    });
  }

  render() {
    const endingDate = new Date();
    const startingDate = addDays(endingDate, -30);

    const {metrics} = this.props;

    const visitorsDataSet = [];

    getDates(startingDate, endingDate).forEach(date => {
      visitorsDataSet.push({
        x: new Date(date).toLocaleDateString(),
        visitors: metrics.filter(metric => {
          return (
            new Date(date).toLocaleDateString() ===
            new Date(metric.date).toLocaleDateString()
          );
        }).length
      });
    });

    const browsers = {};
    const browserDataSet = [];

    metrics.forEach(metric => {
      if (!metric.browser) console.log(metric);
      if (!browsers[metric.browser]) browsers[metric.browser] = 0;
      browsers[metric.browser]++;
    });

    for (const prop in browsers) {
      browserDataSet.push({
        browser: prop,
        count: browsers[prop],
        color: browsersColors[prop]
      });
    }

    const language = {};
    const languageDataSet = [];

    metrics.forEach(metric => {
      if (!language[metric.language]) language[metric.language] = 0;
      language[metric.language]++;
    });
    for (const prop in language) {
      languageDataSet.push({
        language: prop,
        count: language[prop]
      });
    }

    return (
      <React.Fragment>
        <section className="dashboard__section">
          <h2>Visitors </h2>

          <ResponsiveContainer min-height="100" height="50%" width="80%">
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
                stroke="#8884d8"
                strokeWidth="4"
              />
            </LineChart>
          </ResponsiveContainer>
        </section>
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
                return <Cell key={`cell-${index}`} fill={entry.color} />;
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
                return <Cell key={`cell-${index}`} fill={entry.color} />;
              })}
            </Bar>
          </BarChart>
        </section>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  metrics: state.metricsStore.metrics
});

const mapDispatchToProps = dispatch => ({
  fetchMetrics: ({startingDate, endingDate}) => {
    dispatch(metricsActions.metricsFetchRequest({startingDate, endingDate}));
  }
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(VisitorsChart)
);
