const { check } = require("express-validator");

exports.validate = method => {
  switch (method) {
    case "register": {
      return [
        check("name", "Name is required").notEmpty(),
        check("lastName", "Last name is required").notEmpty(),
        check("email", "Please include a valid email").isEmail(),
        check(
          "password",
          "Password must must be 4 or more characters"
        ).isLength({
          min: 4
        })
      ];
    }
    case 'login':{
      return [
        check("email", "Please include a valid email").isEmail(),
        check("password", "Password must must be 5 or more characters").isLength({
          min: 4
        })
      ]
    }
  }
};
