const express = require("express");
const router = express.Router();
const { validate } = require("../controllers/validate");
const { register } = require("../controllers/register");
const { login } = require("../controllers/login");

//@desc   Register user
//@route  POST /api/v1/auth/register
//@acces  Public
router.post("/register", validate("register"), register);

//@desc   Login user
//@route  POST /api/v1/auth/login
//@acces  Public
router.post("/login", validate("login"), login);

module.exports = router;