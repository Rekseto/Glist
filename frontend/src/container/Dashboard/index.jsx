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
import DashBoardCharts from "../../components/DashboardCharts";
import {authActions} from "../../state/ducks/auth";
import {countByField} from "../../helpers/dataHelper";
const browsersColors = {
  "Google Chrome": "#4689F4",
  Firefox: "#FF6611",
  Opera: "#D81024",
  Edge: "",
  Unknown: ""
};

const languagesAbbreviations = {
  "pl-PL": "pl",
  "en-GB": "eng",
  "en-CA": "eng",
  "en-US": "eng",
  "en-AU": "eng"
};

class Dashboard extends React.Component {
  constructor() {
    super();

    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    const today = new Date();
    this.props.fetchMetrics({
      startingDate: addDays(today, -30),
      endingDate: today
    });
  }

  logout() {
    const {logoutRequest, token} = this.props;

    logoutRequest(token);
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
    const browserDataSet = countByField("browser", metrics);
    const language = {};
    const languageDataSet = [];

    metrics.forEach(metric => {
      const prop = languagesAbbreviations[metric.language] || metric.language;
      if (!language[prop]) language[prop] = 0;
      language[prop]++;
    });
    for (const prop in language) {
      languageDataSet.push({
        language: prop,
        count: language[prop]
      });
    }

    const chartsProps = {
      logout: this.logout,
      browserDataSet,
      languageDataSet,
      visitorsDataSet
    };
    return (
      <React.Fragment>
        <DashBoardCharts {...chartsProps} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  metrics: state.metricsStore.metrics,
  token: state.authStore.token
});

const mapDispatchToProps = dispatch => ({
  fetchMetrics: ({startingDate, endingDate}) => {
    dispatch(metricsActions.metricsFetchRequest({startingDate, endingDate}));
  },
  logoutRequest: token => dispatch(authActions.logoutRequest(token))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Dashboard)
);
