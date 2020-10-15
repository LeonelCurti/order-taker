const User = require("../models/User");
const RefreshToken = require("../models/RefreshTokens");
const { validationResult } = require("express-validator");
const ErrorResponse = require("../utils/errorResponse");
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
      return next(new ErrorResponse(errors.array()[0].msg, 422));
    }
    const { email, password } = req.body;

    //Get request ip
    let ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    ip = ip.replace("::ffff:", "");

    // See if user exist
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorResponse("Incorrect username or password.", 401));
    }
    // Check if password matches
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return next(new ErrorResponse("Incorrect username or password.", 401));
    }
    // Create access token
    const accessToken = signAccessToken({ id: user._id });

    // Create refresh token in db
    const refreshToken = await RefreshToken.create({
      user: user._id,
      createdByIp: ip,
      expireAt: new Date(Date.now() + 15 * 60000), //for testing
      //8 min after created mongodb will clean this token from db
      // expireAt: new Date(Date.now() + process.env.REFRESH_COOKIE_EXPIRE_DAYS * 24 * 60 * 60 * 1000),
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
  try {
    //check for errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(new ErrorResponse(errors.array()[0].msg, 422));
    }

    const { firstName, lastName, email, password } = req.body;

    //See if user already exist
    const check_user = await User.findOne({ email });
    if (check_user) {
      return next(new ErrorResponse("Email already taken.", 409));
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
      .json({ success: true, message: "User was registered successfully." });
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
  } catch (error) {
    console.log(`logout warning: ${error.message}`);
  } finally {
    return res
      .clearCookie("refresh_token")
      .json({ success: true, message: "User was logged out successfully." });
  }
};

exports.me = (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user,
      message: "User successfully loaded.",
    });
  } catch (error) {
    next(error);
  }
};
exports.refreshToken = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refresh_token;
    if (!refreshToken) {
      return next(new ErrorResponse("No refresh token provided.", 403));
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_JWT_SECRET);

    const token = await RefreshToken.findById(decoded.tokenId).populate("user");
    if (!token) {
      return next(new ErrorResponse("No token found.", 403));
    }

    const accessToken = signAccessToken({ id: token.user._id });

    return res.status(200).json({
      success: true,
      accessToken,
      message: "Access token successfully created.",
    });
  } catch (error) {
    next(error);
  }
};
