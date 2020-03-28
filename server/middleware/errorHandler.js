const errorHandler = (err, req, res, next) => {
  //log to console for dev
  console.log(err.stack.red);

  return res.status(err.statusCode || 500).json({
    success: false,
    error: err.detailToClient || "Server Error"
  });
};

module.exports = errorHandler;
