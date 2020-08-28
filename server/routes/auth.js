const express = require("express");
const router = express.Router();
const { validate } = require("../controllers/authValidation");
const { login, register, logout, me } = require("../controllers/auth");
const { isAuth } = require("../middleware/auth");

//@route   /api/v1/auth
router.post("/register", validate("register"), register);
router.post("/login", validate("login"), login);
router.get("/logout", logout);
router.get("/me", isAuth, me);

module.exports = router;
