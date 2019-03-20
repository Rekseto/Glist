export const metricsFetchRequest = ({startingDate, endingDate}) => ({
  type: "METRICS_FETCH_REQUEST",
  payload: {
    startingDate,
    endingDate
  },
  headers: {
    "Content-Type": "application/json; charset=utf-8"
  }
});

export const metricsFetchReceive = json => ({
  type: "METRICS_FETCH_RECEIVE",
  payload: {
    ...json
  }
});

export const metricsFetchFailed = error => ({
  type: "METRICS_FETCH_FAILED",
  error
});
