import {takeLatest, put, call} from "redux-saga/effects";
import {createSagaApiCall} from "../../../helpers/reduxHelper";
import {
  loginReceive,
  logoutReceive,
  loginFailed,
  registerFailed,
  registerReceive
} from "./actions";
import {
  registerEndpoint,
  loginEndpoint,
  verifyEndpoint,
  logoutEndpoint
} from "../endpoints";
const loginSagaCall = createSagaApiCall(
  loginEndpoint,
  "POST",
  loginReceive,
  loginFailed
);

const registerSagaCall = createSagaApiCall(
  registerEndpoint,
  "POST",
  registerReceive,
  registerFailed
);

export default function* authSaga() {
  yield takeLatest("AUTH_LOGIN_REQUEST", loginSagaCall);
  yield takeLatest("AUTH_REGISTER_REQUEST", registerSagaCall);
  yield takeLatest("AUTH_LOGOUT_REQUEST", function*(action) {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("userData");

      const data = yield call(fetch, logoutEndpoint, {
        method: "GET",
        headers: action.headers
      });

      const json = yield data.json();

      if (json.success) {
        yield put(logoutReceive());
      }
    } catch (error) {}
  });

  yield takeLatest("AUTH_LOGIN_RECEIVE", function*(action) {
    const json = yield action.payload;

    localStorage.setItem("token", json.token);
    localStorage.setItem("userData", JSON.stringify(json.userData));
  });

  yield takeLatest("AUTH_VERIFY", function*(action) {
    try {
      const token = localStorage.getItem("token");
      const userData = JSON.parse(localStorage.getItem("userData"));

      if (token && userData) {
        const data = yield call(fetch, verifyEndpoint, {
          method: "GET",
          headers: {
            Authorization: token
          }
        });

        const json = yield data.json();

        if (json.success) {
          yield put(
            loginReceive({
              token,
              userData
            })
          );
        } else {
          localStorage.setItem("token", "");
          localStorage.setItem("userData", "");
        }
      }
    } catch (error) {
      localStorage.setItem("token", "");
      localStorage.setItem("userData", "");
    }
  });
}
