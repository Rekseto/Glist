class NotFound extends Error {
  constructor() {
    super();

    this.errorCode = 102;
    this.httpStatus = 404;
    this.userMessage = "Not Found";
  }
}

module.exports = NotFound;
