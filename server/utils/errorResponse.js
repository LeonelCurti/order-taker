class ErrorResponse extends Error {
  //keep original message and add detail or status to client
  constructor(originalMessage, detailToClient, statusCode) {
    super(originalMessage);
    this.statusCode = statusCode;
    this.detailToClient = detailToClient;
  }
}

module.exports = ErrorResponse;
