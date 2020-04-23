const express = require("express");
const router = express.Router();
const { validate } = require("../controllers/authValidation");
const { login, register, logout, me } = require("../controllers/auth");
const { isAuth } = require("../middleware/auth");
//@desc   Register user
//@route  POST /api/v1/auth/register
//@acces  Public
router.post("/register", validate("register"), register);

//@desc   Login user
//@route  POST /api/v1/auth/login
//@acces  Public
router.post("/login", validate("login"), login);

//@desc   Logout user
//@route  POST /api/v1/auth/logout
//@acces  Public
router.get("/logout", logout);

//@desc   Get user by token
//@route  POST /api/v1/auth/me
//@acces  private
router.get("/me",isAuth, me);

module.exports = router;