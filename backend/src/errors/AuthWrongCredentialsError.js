class AuthWrongCredentialsError extends Error {
  constructor() {
    super();

    this.errorCode = 101;
    this.httpStatus = 401;
    this.userMessage = "Wrong credentials";
  }
}

module.exports = AuthWrongCredentialsError;
