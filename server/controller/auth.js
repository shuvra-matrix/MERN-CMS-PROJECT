const nodeMailer = require("nodemailer");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const { json } = require("express");

const transporter = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER_ID,
    pass: process.env.PASSWORD,
  },
});

exports.signup = (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    const err = new Error("Validation Error");
    err.statusCode = 422;
    err.data = error.array();
    throw err;
  }

  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const min = 12456;
  const max = 98985;
  const randomOTP = Math.floor(Math.random() * (max - min + 1)) + min;

  let userId;
  let encryptPassword;

  bcrypt
    .hash(password, 12)
    .then((hashPassword) => {
      encryptPassword = hashPassword;

      return User.findOne({ email: email });
    })
    .then((user) => {
      if (user) {
        user.email = email;
        user.password = encryptPassword;
        user.name = name;
        user.otp = randomOTP;

        return user.save();
      }

      const newUser = new User({
        name: name,
        email: email,
        password: encryptPassword,
        otp: randomOTP,
      });

      return newUser.save();
    })
    .then((response) => {
      userId = response._id;
      const mailOption = {
        from: process.env.USER_ID,
        to: email,
        subject: "BlogSpot OTP",
        html: `<html><body style="width : 95%; text-align:center;   display: flex;
                justify-content: center;
                align-items: center; margin : auto ; background-color :#000000d9;padding : 15px ;">
                
                <div style="width : 95% ;height : 90%; text-align : center; margin : 12px auto ; background-color : #0c0921; padding:1rem">
                <h1 style="color : green">Hi Your Api limit is end. We call a new api . please add more api</h1>
                  <h2 style="margin:12px , color : orange "> Your OTP - ${randomOTP} </h2>
                </div>
                
                </body></html>`,
      };
      return transporter.sendMail(mailOption);
    })
    .then((response) => {
      res.status(201).json({
        message: "otp send successfully",
        userId: userId,
      });
    })
    .catch((err) => {
      console.log(err);
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.verifyOtp = (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    const err = new Error("Validation Error");
    err.statusCode = 422;
    err.data = error.array();
    throw err;
  }
  const otp = req.body.otp;
  const userId = req.body.userId;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        const error = new Error("user not found");
        error.statusCode = 404;
        throw err;
      }

      if (Number(otp) === user.otp) {
        user.valid = "yes";
        return user.save();
      }
    })
    .then((result) => {
      if (!result) {
        return res.status(201).json({ message: "notverified" });
      }
      res.status(201).json({ message: "verified" });
    })
    .catch((err) => {
      console.log(err);
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.login = (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    const err = new Error("Validation Error");
    err.statusCode = 422;
    err.data = error.array();
    throw err;
  }

  const email = req.body.email;
  const password = req.body.password;
  let loadUser;

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        const error = new Error("user not found");
        error.statusCode = 404;
        throw error;
      }

      loadUser = user;

      return bcrypt.compare(password, user.password);
    })
    .then((match) => {
      if (!match) {
        const error = new Error("password not matched");
        error.statusCode = 401;
        throw error;
      }

      const secret = process.env.SECRET;

      const token = jwt.sign(
        { email: loadUser.email, userId: loadUser._id.toString() },
        secret,
        {
          expiresIn: "1h",
        }
      );

      res.status(200).json({
        message: "login done",
        userId: loadUser._id.toString(),
        token: token,
      });
    })
    .catch((err) => {
      console.log(err);
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.tokenVerify = (req, res, next) => {
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

  res.status(200).json({
    message: "valid auth",
  });
};
