const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    const error = new Error("invalid token");
    error.statusCode = 401;
    throw error;
  }

  const token = req.get("Authorization").split(" ")[1];

  if (!token) {
    const error = new Error("invalid token");
    error.statusCode = 401;
    throw error;
  }

  let decodeToken;
  const secret = process.env.SECRET;

  try {
    decodeToken = jwt.verify(token, secret);
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }

  req.userId = decodeToken.userId;

  next();
};
