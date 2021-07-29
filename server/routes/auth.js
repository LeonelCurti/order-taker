const express = require("express");
const authRouter = express.Router();
const { validate } = require("../middleware/validate");
const {
  login,
  register,
  logout,
  me,
  refreshToken,
} = require("../controllers/auth");
const { auth } = require("../middleware/auth");

//@route   /api/v1/auth
authRouter.post("/register", validate("register"), register);
authRouter.post("/login", validate("login"), login);
authRouter.get("/logout", logout);
authRouter.get("/me", auth(), me);
authRouter.get("/refresh-token", refreshToken);

module.exports = authRouter;
