const NotFound = require("./NotFound");
const RegisterFailedError = require("./RegisterFailedError");
const AuthWrongCredentialsError = require("./AuthWrongCredentialsError");
const NotAllowedError = require("./NotAllowedError");

module.exports = [
  NotFound,
  RegisterFailedError,
  AuthWrongCredentialsError,
  NotAllowedError
];
