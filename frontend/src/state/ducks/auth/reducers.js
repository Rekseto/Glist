import * as R from "ramda";
import createReducer from "../../../helpers/reducerHelper";

const initialState = {
  isFetching: false,
  isLogged: false,
  token: "",
  error: null
};

const actionHandlers = {
  AUTH_LOGIN_REQUEST: (state, action) => {
    return R.evolve(R.__, state)({
      isFetching: R.T,
      error: R.always(null)
    });
  },

  AUTH_LOGIN_RECEIVE: (state, action) => {
    return R.evolve(R.__, state)({
      isFetching: R.F,
      isLogged: R.T,
      token: R.always(action.payload.token),
      user: R.always(action.payload.userData)
    });
  },

  AUTH_LOGIN_FAILED: (state, action) => {
    return R.evolve(R.__, state)({
      isFetching: R.F,
      isLogged: R.F,
      user: R.always({}),
      error: R.always(action.error)
    });
  },

  AUTH_LOGOUT_RECEIVE: (state, action) => {
    return R.evolve(R.__, state)({
      isLogged: R.F,
      isFetching: R.F,
      token: R.always(null),
      user: R.always(null)
    });
  },
  AUTH_LOGOUT_FAILED: (state, action) => {
    return R.evolve(R.__, state)({
      isLogged: R.F,
      token: R.always(null)
    });
  }
};

export default createReducer(initialState, actionHandlers);
