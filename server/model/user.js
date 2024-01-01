const mongoos = require("mongoose");

const Schema = mongoos.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  bio: {
    type: String,
  },
  website: {
    type: String,
  },
  valid: {
    type: String,
    default: "no",
  },
  otp: {
    type: Number,
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Posts",
    },
  ],
  ip: {
    type: String,
  },
  resetToken: {
    type: String,
  },
  resetTokenExp: {
    type: Date,
  },
  isTokenExp: {
    type: String,
  },
});

module.exports = mongoos.model("User", userSchema);
