const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../models/Users");

//@desc   Register user
//@route  POST /api/vs/user/register
//@acces  Public
router.post(
  "/",
  [
    check("name", "Name is required").notEmpty(),
    check("lastName", "Last name is required").notEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password must must be 5 or more characters").isLength({
      min: 4
    })
  ],
  async (req, res, next) => {
    //check for errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ success: false, error: errors.array() });
    }

    try {
      const { name, lastName, email, password } = req.body;

      //See if user already exist
      const check_user = await User.findOne({ email });
      if (check_user) {
        return res
          .status(400)
          .json({ success: false, error: "Email already exist" });
      }

      //Create new user and save in db
      const user = await User.create({
        name,
        lastName,
        email,
        password
      });

      //create token
      const token = user.getSignedJwtToken();

      //Set cookie options
      const cookieOptions = {
        expires: new Date(
          Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1
        ),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production" ? true : false
      };

      return res
        .status(200)
        .cookie("token", token, cookieOptions)
        .json({ success: true, token });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
