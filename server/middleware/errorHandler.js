const errorHandler = (err, req, res, next) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || "Something went wrong!",
    });
  } else {
    // Programming or other unknown error
    console.log("----ERROR--------------".red);

    console.log(`Error name: ${err.name}\n`);
    console.log(`Error message: ${err.message}\n`);

    console.log("------------------------".red);

    res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

module.exports = errorHandler;
