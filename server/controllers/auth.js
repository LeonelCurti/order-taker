const User = require("../models/User");
const RefreshToken = require("../models/RefreshTokens");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const {
  signRefreshToken,
  setTokenCookie,
  signAccessToken,
} = require("../utils/jwt_helper");

exports.login = async (req, res, next) => {
  try {
    // Check for input errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(422)
        .json({ success: false, error: errors.array()[0].msg });
    }
    const { email, password } = req.body;

    //Get request ip
    let ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    ip = ip.replace("::ffff:", "");

    // See if user exist
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid credentials" });
    }

    // Check if password matches
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid credentials" });
    }
    // Create access token
    const accessToken = signAccessToken({ id: user._id });

    // Create refresh token in db
    const refreshToken = await RefreshToken.create({
      user: user._id,
      createdByIp: ip,
      expireAt: new Date(Date.now() + 5 * 60000), //5 min after created
    });

    const signedRefreshToken = signRefreshToken({ tokenId: refreshToken._id });

    setTokenCookie(res, "refresh_token", signedRefreshToken);

    return res.status(200).json({
      success: true,
      accessToken,
      user,
    });
  } catch (error) {
    next(error);
  }
};

exports.register = async (req, res, next) => {
  //check for errors
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ success: false, error: errors.array()[0].msg });
  }

  try {
    const { firstName, lastName, email, password } = req.body;

    //See if user already exist
    const check_user = await User.findOne({ email });
    if (check_user) {
      return res
        .status(400)
        .json({ success: false, error: "Email already exist" });
    }

    //Create new user and save in db
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
    });
    return res
      .status(200)
      .json({ success: true, message: "User was registered successfully!" });
  } catch (error) {
    next(error);
  }
};

exports.logout = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refresh_token;
    if (refreshToken) {
      const decoded = jwt.verify(refreshToken, process.env.REFRESH_JWT_SECRET);

      // pending: users can revoke their own tokens and admins can delete any tokens

      await RefreshToken.findByIdAndRemove(decoded.tokenId);
    }
    return res
      .clearCookie("refresh_token")
      .json({ success: true, message: "User was logged out successfully!" });
  } catch (error) {
    console.log(error);
    return res.clearCookie("refresh_token").json({ success: true });
  }
};

exports.me = async (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      user: req.user,
      message:'User successfully loaded.'
    });
  } catch (error) {
    next(error);
  }
};
exports.refreshToken = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refresh_token;
    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        error: "No refresh token provided!",        
      });
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_JWT_SECRET);

    const token = await RefreshToken.findById(decoded.tokenId).populate("user");
    if (!token) {
      return res.status(401).json({
        success: false,
        error: "No token found",
      });
    }

    const accessToken = signAccessToken({ id: token.user._id });

    return res.status(200).json({
      success: true,
      accessToken,
      message:'Access token successfully created.'
    });
  } catch (error) {
    next(error);
  }
};
