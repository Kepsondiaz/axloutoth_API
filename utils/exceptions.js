class HttpError extends Error {
  constructor(error, statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.error = error;
  }
}

module.exports = { HttpError };
