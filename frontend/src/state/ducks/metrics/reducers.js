import * as R from "ramda";
import createReducer from "../../../helpers/reducerHelper";

const initialState = {
  isFetching: false,
  metrics: [],
  error: null
};

const actionHandlers = {
  METRICS_FETCH_REQUEST: (state, action) => {
    return R.evolve(R.__, state)({
      isFetching: R.T,
      error: R.always(null)
    });
  },
  METRICS_FETCH_RECEIVE: (state, action) => {
    return R.evolve(R.__, state)({
      isFetching: R.F,
      metrics: R.always(action.payload)
    });
  }
};

export default createReducer(initialState, actionHandlers);
