const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.isAuth = async (req, res, next) => {
  let token = req.headers["x-auth-token"];
  if (!token) {
    return res.status(401).json({
      success: false,
      error: "No token provided!",
    });
  }

  jwt.verify(token, process.env.ACCESS_JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        success: false,
        error: err.message,
      });
    }
    const userId = decoded.id;
    return User.findById(userId, (error, user) => {
      if (error || !user) {
        return res.status(401).json({
          success: false,
          error: "No user found",
        });
      }
      req.user = user;
      return next();
    });
  });
};

exports.isAdmin = (req, res, next) => {
  //check if user is admin
  if (!req.user.isAdmin) {
    return res.status(401).json({
      success: false,
      error: "Unauthorized!",
    });
  }
  next();
};
