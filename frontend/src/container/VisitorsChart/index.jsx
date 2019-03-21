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
  Area
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
    const startingDate = new Date();
    const endingDate = addDays(today, -30);

    this.props.fetchMetrics({
      startingDate,
      endingDate
    });
  }

  render() {
    const endingDate = new Date();
    const startingDate = addDays(endingDate, -30);

    const {metrics} = this.props;
    const obj = {};

    getDates(startingDate, endingDate).forEach(date => {
      const prop = new Date(date).toLocaleDateString();
      if (!obj[prop]) obj[prop] = 0;
    });

    const result = [];
    metrics.forEach(metric => {
      const propName = new Date(metric.date).toLocaleDateString();
      obj[propName]++;
    });

    for (const prop in obj) {
      const newProp = `${parseInt(prop.split(".")[0])} ${
        monthNames[prop.split(".")[1] - 1]
      }`;

      result.push({date: newProp, visitors: obj[prop]});
    }

    return (
      <React.Fragment>
        <ResponsiveContainer min-height="100" height="50%" width="80%">
          <AreaChart
            data={result}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="visitors" stroke="#8884d8" />
          </AreaChart>
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
