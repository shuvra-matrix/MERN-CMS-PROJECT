const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { sendEmail } = require("./mail");

exports.signup = (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    const err = new Error("Validation Error");
    err.statusCode = 403;
    const errArray = error.array();
    err.data = errArray[0].msg;
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
      const ip = req.clientIp;
      const resetTime = Date.now() + 900000;
      if (user) {
        user.email = email;
        user.password = encryptPassword;
        user.name = name;
        user.otp = randomOTP;
        user.ip = ip;
        user.resetTokenExp = resetTime;

        return user.save();
      }

      const newUser = new User({
        name: name,
        email: email,
        password: encryptPassword,
        otp: randomOTP,
        ip: req.clientIp,
        resetTokenExp: resetTime,
      });

      return newUser.save();
    })
    .then((response) => {
      userId = response._id;
      let message = `Thank you for signing up with BlogSopt!. To ensure the security of
              your account, we require you to verify your email address. Please
              use the following one-time password (OTP) to complete the
              verification process.This OTP is valid for <span style="font-weight: 600; color: #1f1f1f">15 minutes</span>.
              Do not share this with others.`;

      let action = `   <p
              style="
                margin: 0;
                margin-top: 60px;
                font-size: 30px;
                font-weight: 600;
                letter-spacing: 15px;
                color: #ba3d4f;
              "
            >
              ${randomOTP}
            </p>`;

      let title = "OTP";

      return sendEmail(title, email, name, message, action);
    })
    .then((response) => {
      res.status(201).json({
        message: "otp send successfully",
        userId: userId,
      });
    })
    .catch((err) => {
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

  User.findOne({ _id: userId, resetTokenExp: { $gt: Date.now() } })
    .then((user) => {
      if (!user) {
        const error = new Error("user not found");
        error.statusCode = 404;
        throw error;
      }

      if (Number(otp) === user.otp) {
        user.valid = "yes";
        return user.save();
      }
    })
    .then((result) => {
      if (!result) {
        return res.status(403).json({ message: "notverified" });
      }
      res.status(201).json({ message: "verified" });
    })
    .catch((err) => {
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

  User.findOne({ email: email, valid: "yes" })
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
        secret
      );

      res.status(200).json({
        message: "login done",
        token: token,
      });
    })
    .catch((err) => {
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

  req.userId = decodeToken.userId;
  res.status(200).json({
    message: "valid auth",
  });
};

exports.sendResetLink = (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    const err = new Error("Validation Error");
    err.statusCode = 403;
    const errArray = error.array();
    err.data = errArray[0].msg;
    throw err;
  }

  crypto.randomBytes(32, (err, bytes) => {
    if (err) {
      const error = new Error("Validation Error");
      error.statusCode = 500;
      throw error;
    }

    const token = bytes.toString("hex");
    const email = req.body.email;
    let name;

    User.findOne({ email: email })
      .then((user) => {
        if (!user) {
          const err = new Error("email is not registered");
          err.statusCode = 403;
          err.data = "email is not registered";
          throw err;
        }
        name = user.name;
        user.resetToken = token;
        user.resetTokenExp = Date.now() + 900000;
        user.isTokenExp = "no";
        return user.save();
      })
      .then((result) => {
        let message = ` We received a request to reset the password for your BlogSopt account. 
        To proceed with the password reset, please click on the link below. 
        This link is valid for <span style="font-weight: 600; color: #1f1f1f">15 minutes</span>. Do not share this with others.`;

        let resetUrl =
          process.env.RESET_URL + token ||
          "http://localhost:3000/resetpassword?token=" + token;

        let action = ` <a
              style="
                width: 95%;
                margin: auto;
                text-decoration: none;
                color: white;
                text-align: center;
              "
              href=${resetUrl}
              target="_blank"
              ><p
                style="
                  max-width: 150px;
                  margin: 20px auto;
                  padding: 15px 0px;
                  font-size: 1.2rem;
                  font-weight: 500;
                  background-color: rgb(3, 30, 56);
                  border: 0px;
                  border-radius: 8px;
                "
              >
                Click Here
              </p></a`;

        let title = "Password Reset Link";

        return sendEmail(title, email, name, message, action);
      })
      .then((result) => {
        res.status(200).json({ message: "reset link send" });
      })
      .catch((err) => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  });
};

exports.getNewResetToken = (req, res, next) => {
  const token = req.query.token;
  User.findOne({
    resetToken: token,
    resetTokenExp: { $gt: Date.now() },
    isTokenExp: "no",
  })
    .then((user) => {
      if (!user) {
        const error = new Error("no user found");
        error.statusCode = 404;
        error.data = "no user found";
        throw error;
      }

      res.status(200).json({
        message: "token verified",
        userId: user._id.toString(),
        token: token,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.postNewPassword = (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    const err = new Error("Validation Error");
    err.statusCode = 403;
    const errArray = error.array();
    err.data = errArray[0].msg;
    throw err;
  }

  const userId = req.body.userId;
  const password = req.body.password;
  const token = req.body.token;

  let encryptPassword;

  bcrypt
    .hash(password, 12)
    .then((hashPassword) => {
      encryptPassword = hashPassword;

      User.findOne({
        _id: userId,
        resetToken: token,
        resetTokenExp: { $gt: Date.now() },
        isTokenExp: "no",
      })
        .then((user) => {
          if (!user) {
            const error = new Error("no user found");
            error.statusCode = 404;
            error.data = "no user found";
            throw error;
          }

          user.password = hashPassword;
          user.isTokenExp = "yes";
          return user.save();
        })
        .then((result) => {
          res.status(201).json({ message: "password reset done" });
        })
        .catch((err) => {
          if (!err.statusCode) {
            err.statusCode = 500;
          }

          next(err);
        });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }

      next(err);
    });
};
