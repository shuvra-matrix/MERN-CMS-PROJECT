const express = require("express");
const { body } = require("express-validator");
const User = require("../model/User");

const rourte = express.Router();

const authController = require("../controller/auth");

rourte.post(
  "/signup",
  [
    body("email")
      .trim()
      .isEmail()
      .withMessage("Invalid Email")
      .custom((value, req) => {
        return User.findOne({
          $and: [{ email: value }, { valid: "yes" }],
        }).then((result) => {
          if (result) {
            return Promise.reject("Email present!");
          }
        });
      })
      .normalizeEmail(),

    body("name")
      .trim()
      .isString()
      .isLength({ min: 5 })
      .withMessage("invalid name"),
    body("password")
      .trim()
      .isLength({ min: 6 })
      .withMessage("invalid password"),
    body("confirmPassword")
      .trim()
      .isLength({ min: 6 })
      .withMessage("invalid password")
      .custom((value, { req }) => {
        if (value.toString() != req.body.password.toString()) {
          return Promise.reject("password not matched");
        }
        return true;
      }),
  ],
  authController.signup
);

rourte.post(
  "/otpverify",
  [body("otp").isNumeric().withMessage("otp not valid")],
  authController.verifyOtp
);

module.exports = rourte;
