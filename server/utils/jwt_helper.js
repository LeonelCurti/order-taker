const jwt = require("jsonwebtoken");

module.exports = {
  signRefreshToken,
  setTokenCookie,
  signAccessToken,
};

function signAccessToken(payload) {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRE,
  });
}

function signRefreshToken(payload) {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRE,
  });
}

function setTokenCookie(res, cookieName, payload) {
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.REFRESH_COOKIE_EXPIRE_DAYS * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" ? true : false,
  };
  res.cookie(cookieName, payload, cookieOptions);
}
