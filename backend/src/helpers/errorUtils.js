const errors = require("../errors");

function generateErrorResponse(error) {
  const response = {
    success: false,
    httpStatus: 500,
    userMessage: "Internal Server Error",
    errorCode: 1
  };

  errors.forEach(instance => {
    if (error instanceof instance) {
      response.httpStatus = error.httpStatus;
      response.userMessage = error.userMessage;
      response.errorCode = error.errorCode;
    }
  });
  return response;
}

module.exports = {
  generateErrorResponse
};
