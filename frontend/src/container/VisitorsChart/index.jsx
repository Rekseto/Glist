import * as React from "react";
import {connect} from "react-redux";
import {LineChart, BarChart} from "react-easy-chart";
import moment from "moment";
import {withRouter} from "react-router";

import {metricsActions} from "../../state/ducks/metrics";
import {
  addDays,
  formatDate,
  getDates,
  monthNames
} from "../../helpers/dateHelper";
import "./index.css";

const browsersColors = {
  "Google Chrome": "#4689F4",
  Firefox: "#F62336",
  Opera: "",
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
      const prop = moment(date).format("D-MMM-YY");
      visitorsDataSet.push({
        x: prop,
        y: metrics.filter(metric => {
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
        x: prop,
        y: browsers[prop],
        color: browsersColors[prop]
      });
    }

    return (
      <React.Fragment>
        <section className="dashboard__section">
          <h2>Liczba wizyt na stronie</h2>
          <LineChart
            xType={"time"}
            dataPoints
            axes
            grid
            verticalGrid
            lineColors={["#000000"]}
            width={700}
            height={450}
            data={[visitorsDataSet]}
          />
        </section>
        <section className="dashboard__section">
          <h2>Przeglądarki</h2>
          <BarChart
            width="650"
            height="300"
            axisLabels={{x: "", y: ""}}
            axes
            margin={{top: 50, right: 100, bottom: 50, left: 100}}
            colorBars
            barWidth={5}
            data={browserDataSet}
          />
          <div className="dashboard__chart" />
        </section>
        <section className="dashboard__section">
          <h2>Język</h2>
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
