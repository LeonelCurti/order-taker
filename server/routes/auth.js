const express = require("express");
const router = express.Router();
const { validate } = require("../controllers/authValidation");
const { login, register, logout } = require("../controllers/auth");

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

module.exports = router;