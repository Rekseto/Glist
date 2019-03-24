export const loginRequest = (username, password) => ({
  type: "AUTH_LOGIN_REQUEST",
  payload: {
    username,
    password
  },
  headers: {
    "Content-Type": "application/json; charset=utf-8"
  }
});

export const loginReceive = json => ({
  type: "AUTH_LOGIN_RECEIVE",
  payload: {
    ...json
  }
});

export const loginFailed = error => ({
  type: "AUTH_LOGIN_FAILED",
  error
});

export const authVerify = () => ({
  type: "AUTH_VERIFY"
});

export const logoutRequest = token => ({
  type: "AUTH_LOGOUT_REQUEST",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    Authorization: token
  }
});

export const logoutReceive = json => ({
  type: "AUTH_LOGOUT_RECEIVE",
  json
});

export const logoutFailed = error => ({
  type: "AUTH_LOGOUT_FAILED",
  error
});

export const registerRequest = (username, password, email, permission) => ({
  type: "AUTH_REGISTER_REQUEST",
  payload: {
    username,
    password,
    email,
    permission
  },
  headers: {
    "Content-Type": "application/json; charset=utf-8"
  }
});

export const registerReceive = json => ({
  type: "AUTH_REGISTER_RECEIVE",
  payload: {
    ...json
  }
});

export const registerFailed = error => ({
  type: "AUTH_REGISTER_FAILED",
  error
});

export default {
  loginRequest,
  loginReceive,
  loginFailed,

  logoutRequest,
  logoutReceive,

  registerRequest,
  registerReceive,
  registerFailed
};
