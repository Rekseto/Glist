import * as React from "react";
import {connect} from "react-redux";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar
} from "recharts";

import {withRouter} from "react-router";

import {metricsActions} from "../../state/ducks/metrics";
import {
  addDays,
  formatDate,
  getDates,
  monthNames
} from "../../helpers/dateHelper";

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

    const dataSet = [];

    getDates(startingDate, endingDate).forEach(date => {
      const prop = new Date(date).toLocaleDateString();

      dataSet.push({
        date: prop,
        visitors: metrics.filter(metric => {
          return (
            new Date(date).toLocaleDateString() ===
            new Date(metric.date).toLocaleDateString()
          );
        }).length
      });
    });

    return (
      <React.Fragment>
        <ResponsiveContainer min-height="100" height="50%" width="80%">
          <LineChart
            data={dataSet}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="visitors"
              stroke="#8884d8"
              strokeWidth="4"
            />
          </LineChart>
        </ResponsiveContainer>
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
