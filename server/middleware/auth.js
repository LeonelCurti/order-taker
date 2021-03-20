const jwt = require("jsonwebtoken");
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");

exports.auth = (roles = []) => {
  // roles param can be a single role string (e.g.'SA')
  // or an array of roles (e.g. [authRoles.admin] = ['SA', 'ADMIN'])
  //If the roles parameter is omitted (i.e. auth()) then the route will be accessible to all authenticated users regardless of role.
  return async (req, res, next) => {
    if (typeof roles === "string") {
      roles = [roles];
    }
    let token = req.headers["x-auth-token"];
    if (!token) {
      return next(new ErrorResponse("No access token provided.", 401));
    }

    jwt.verify(token, process.env.ACCESS_JWT_SECRET, (err, decoded) => {
      if (err) {
        return next(new ErrorResponse("Invalid access token.", 401));
      }

      const userId = decoded.id;
      return User.findById(userId, (error, user) => {
        if (error || !user) {
          return next(new ErrorResponse("User not found.", 401));
        }
        if (roles.length && !roles.includes(user.role)) {
          return next(new ErrorResponse("Role not authorized.", 401));
        }
        // authentication and authorization successful
        req.user = user;
        return next();
      });
    });
  };
};
