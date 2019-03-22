import React from "react";
import ReactDOM from "react-dom";

import {Provider} from "react-redux";
import {HashRouter} from "react-router-dom";
import configureStore from "./state/store";
import registerServiceWorker from "./workers/ServiceWorker";

import App from "./container/App";

import "./index.css";
const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
