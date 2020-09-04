const jwt = require("jsonwebtoken");
const User = require("../models/Users");

exports.isAuth = async (req, res, next) => {

  //check if client sent a valid token 
  let token = req.headers["x-auth-token"];
  // let token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      success: false,
      error: "No token provided!",
    });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        success: false,
        error: err.message,
      });
    }
    req.userId = decoded.id;
    next();
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
