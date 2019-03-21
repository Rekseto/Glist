import {createStore, applyMiddleware, combineReducers, compose} from "redux";
import {all} from "redux-saga/effects";
import {createLogger} from "redux-logger";
import createSagaMiddleware from "redux-saga";
import {routerReducer} from "react-router-redux";
import * as reducers from "./ducks"; // import all reducers from ducks/index.js

import {authSaga} from "./ducks/auth";
import {metricsSaga} from "./ducks/metrics";

function* rootSaga() {
  yield all([authSaga(), metricsSaga()]);
}

export default function configureStore() {
  const middlewares = [];

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

  const sagaMiddleware = createSagaMiddleware();

  middlewares.push(sagaMiddleware);
  middlewares.push(createLogger({level: "info", collapsed: true}));

  const rootReducer = combineReducers({...reducers, routing: routerReducer});

  const enhancer = composeEnhancers(applyMiddleware(...middlewares));

  const store = createStore(rootReducer, enhancer);

  sagaMiddleware.run(rootSaga);
  return store;
}
