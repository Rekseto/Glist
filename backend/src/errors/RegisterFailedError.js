class RegisterFailedError extends Error {
  constructor() {
    super();

    this.errorCode = 100;
    this.httpStatus = 400;
    this.userMessage = "Register failed";
  }
}

module.exports = RegisterFailedError;
