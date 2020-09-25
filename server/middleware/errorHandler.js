const errorHandler = (err, req, res, next) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode || 500).json({
      success: false,  
      message: err.message || "Something went wrong!",
    });
  } else {
    //log to console for dev  
    console.log("----ERROR--------------".red);
    console.log(err.stack);
    console.log("------------------------".red);
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

module.exports = errorHandler;
