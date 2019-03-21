import {takeLatest, put, call} from "redux-saga/effects";

import {metricsEndpoint} from "../endpoints";
import {metricsFetchReceive, metricsFetchFailed} from "./actions";

export default function* metricsSaga() {
  yield takeLatest("METRICS_FETCH_REQUEST", function*(action) {
    try {
      const data = yield call(fetch, metricsEndpoint, {
        method: "POST",
        headers: action.headers,
        body: JSON.stringify(action.payload)
      });

      const json = yield data.json();

      if (json.success) {
        yield put(metricsFetchReceive(json.data));
      } else {
        yield put(metricsFetchFailed(json.error));
      }
    } catch (error) {
      yield put(metricsFetchFailed(error));
    }
  });
}
