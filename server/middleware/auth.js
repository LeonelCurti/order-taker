const jwt = require("jsonwebtoken");
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");

exports.isAuth = async (req, res, next) => {
  let token = req.headers["x-auth-token"];
  if (!token) {
    return next(new ErrorResponse("No token provided.", 401));
  }

  jwt.verify(token, process.env.ACCESS_JWT_SECRET, (err, decoded) => {
    if (err) {
      return next(new ErrorResponse("Invalid token.", 401));
    }

    const userId = decoded.id;
    return User.findById(userId, (error, user) => {
      if (error || !user) {
        return next(new ErrorResponse("User not found", 401));
      }
      req.user = user;
      return next();
    });
  });
};

exports.isAdmin = (req, res, next) => {
  //check if user is admin
  if (!req.user.isAdmin) {
    return next(new ErrorResponse("Unauthorized.", 401));
  }
  next();
};
