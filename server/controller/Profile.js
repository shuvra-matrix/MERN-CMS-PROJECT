const User = require("../model/User");
const PostCategory = require("../model/PostCategory");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const { sendEmail } = require("./mail");

exports.getProfile = (req, res, next) => {
  User.findById(req.userId)
    .then((user) => {
      if (!user) {
        const error = new Error("user not found");
        error.statusCode = 400;
        throw error;
      }

      res.status(200).json({
        message: "user found",
        userData: {
          name: user.name,
          email: user.email,
          location: user.location || "",
          bio: user.bio || "",
          website: user.website || "",
        },
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.sendOtp = (req, res, next) => {
  const email = req.body.email;
  const min = 12456;
  const max = 98985;
  const randomOTP = Math.floor(Math.random() * (max - min + 1)) + min;
  let name;

  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        const err = new Error("user already exist");
        err.statusCode = 403;
        throw err;
      }
      return User.findById(req.userId);
    })

    .then((user) => {
      if (!user) {
        const err = new Error("invalid user");
        err.statusCode = 404;
        throw err;
      }
      name = user.name;
      user.otp = randomOTP;
      user.resetTokenExp = Date.now() + 900000;
      return user.save();
    })
    .then((response) => {
      let message = ` A request to change the email address associated with your BlogSpot account has been initiated. 
      To complete this process, please use the following one-time password (OTP).This OTP is valid for 
      <span style="font-weight: 600; color: #1f1f1f">15 minutes</span>.
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
    .then((result) => {
      res.status(200).json({ message: "otp send" });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.editProfile = (req, res, next) => {
  const data = req.body;

  User.findById(req.userId)
    .then((user) => {
      if (!user) {
        const error = new Error("invalid user");
        error.statusCode = 403;
        throw error;
      }

      if (Number(data.otp) === user.otp || !data.isOtp) {
        user.name = data.name;
        user.email = data.email;
        user.website = data.website;
        user.bio = data.bio;
        user.location = data.location;

        return user.save();
      } else {
        const error = new Error("invalid otp");
        error.statusCode = 401;
        error.data = "invalid otp";
        throw error;
      }
    })
    .then((result) => {
      res.status(201).json({
        message: "profile update",
        userData: {
          name: result.name,
          email: result.email,
          location: result.location || "",
          bio: result.bio || "",
          website: result.website || "",
        },
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.addCategory = (req, res, next) => {
  const name = req.body.name;
  const icon = req.body.icon;
  const desc = req.body.desc;

  const postCategory = new PostCategory({
    name: name,
    icon: icon,
    desc: desc,
  });

  postCategory
    .save()
    .then((result) => {
      res.status(201).json({
        message: "category add done",
        data: {
          name: result.name,
          icon: result.icon,
          desc: result.desc,
        },
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getCategory = (req, res, next) => {
  PostCategory.find()
    .then((post) => {
      const newPost = post.map((data) => {
        return {
          name: data.name.split(" ")[0],
          _id: data._id,
        };
      });

      res
        .status(200)
        .json({ message: "post category get done", postCategory: newPost });
    })
    .then((err) => {
      next(err);
    });
};

exports.updatePassword = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    const err = new Error("Validation Error");
    err.statusCode = 422;
    err.data = error.array();
    throw err;
  }
  const oldpass = req.body.oldpass.trim();
  const password = req.body.newpass.trim();
  const confiempass = req.body.conpass.trim();
  let hasPass;
  const userId = req.userId;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        const error = new Error("user not found");
        error.statusCode = 404;
        throw error;
      }

      return bcrypt.compare(oldpass, user.password).then();
    })
    .then((match) => {
      if (!match) {
        const error = new Error("user not found");
        error.statusCode = 401;
        throw error;
      }

      if (password === confiempass) {
        return bcrypt.hash(password, 12);
      } else {
        const error = new Error("password and confirm not match");
        error.statusCode = 401;
        throw error;
      }
    })
    .then((hasPassword) => {
      hasPass = hasPassword;
      return User.findById(userId);
    })
    .then((user) => {
      if (!user) {
        const error = new Error("user not founds");
        error.statusCode = 404;
        throw error;
      }

      user.password = hasPass;
      return user.save();
    })
    .then((result) => {
      res.status(201).json("update success");
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
