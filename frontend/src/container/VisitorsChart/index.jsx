import * as React from "react";
import {connect} from "react-redux";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

import {withRouter} from "react-router";

import {metricsActions} from "../../state/ducks/metrics";
import {addDays} from "../../helpers/dateHelper";

class VisitorsChart extends React.Component {
  componentDidMount() {
    const today = new Date();
    this.props.fetchMetrics({
      startingDate: addDays(today, -30),
      endingDate: today
    });
  }

  render() {
    const {metrics} = this.props;
    const obj = {};

    metrics.forEach(metric => {
      const metricDateDay = new Date(metric.date).getDate();
      if (!obj[metricDateDay]) obj[metricDateDay] = 0;
      obj[metricDateDay]++;
    });
    const data = [];
    for (const prop in obj) {
      data.push({date: prop + " Day", count: obj[prop]});
    }

    return (
      <React.Fragment>
        <LineChart
          width={730}
          height={250}
          data={data}
          margin={{top: 5, right: 30, left: 20, bottom: 5}}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="linearClosed" dataKey="count" stroke="#8884d8" />
        </LineChart>
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
