const { check } = require("express-validator");

exports.validate = method => {
  switch (method) {
    case "register": {
      return [
        check("firstName", "First Name is required").trim().notEmpty(),
        check("lastName", "Last name is required").trim().notEmpty(),
        check("email", "Please include a valid email").trim().isEmail().normalizeEmail(),
        check(
          "password",
          "Password must must be 4 or more characters"
        ).isLength({
          min: 4
        }).trim()
      ];
    }
    case 'login':{
      return [
        check("email", "Please include a valid email").trim().isEmail().normalizeEmail(),
        check("password", "Password must must be 4 or more characters").isLength({
          min: 4
        }).trim()
      ]
    }
  }
};
