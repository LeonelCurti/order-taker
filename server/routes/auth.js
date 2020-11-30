const express = require("express");
const router = express.Router();
const { validate } = require("../middleware/validate");
const {
  login,
  register,
  logout,
  me,
  refreshToken,
} = require("../controllers/auth");
const { isAuth } = require("../middleware/auth");

//@route   /api/v1/auth
router.post("/register", validate("register"), register);
router.post("/login", validate("login"), login);
router.get("/logout", logout);
router.get("/me", isAuth, me);
router.get("/refresh-token", refreshToken);

module.exports = router;
