const jwt = require("jsonwebtoken");
require("dotenv").config();
const getCookieValue = require("../helper/cookieHandler");
const User = require("../model/User");

module.exports = (req, res, next) => {
  const cookieSting = req.headers.cookie;
  const cookieName = "user_token";

  const token = getCookieValue.getCookieValue(cookieSting, cookieName);

  if (!token) {
    const error = new Error("invalid token");
    error.data = "invalid token";
    error.statusCode = 401;
    throw error;
  }

  let decodeToken;
  const secret = process.env.SECRET;

  try {
    decodeToken = jwt.verify(token, secret);
  } catch (err) {
    err.statusCode = 401;
    err.data = "invalid token";
    throw err;
  }

  const clientUserAgent = req.headers["user-agent"];
  const ip = req.clientIp;

  if (decodeToken.ip !== ip || decodeToken.userAgent !== clientUserAgent) {
    const err = new Error("invalid token");
    err.statusCode = 401;
    err.data = "invalid token";
    throw err;
  }

  req.userId = decodeToken.userId;

  User.findById(req.userId)
    .then((user) => {
      if (!user) {
        const error = new Error("invalid user");
        throw error;
      }

      const isTokenPresent = user.blockedToken.some(
        (blockedToken) => blockedToken.type === token
      );

      if (isTokenPresent) {
        const error = new Error("invalid token");
        throw error;
      }
      next();
    })
    .catch((err) => {
      err.statusCode = 401;
      err.data = "invalid token";
      next(err);
    });
};
