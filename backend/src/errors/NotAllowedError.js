class NotAllowedError extends Error {
  constructor() {
    super();
    this.errorCode = 101;
    this.httpStatus = 401;
    this.userMessage = "Not allowed";
  }
}

module.exports = NotAllowedError;
