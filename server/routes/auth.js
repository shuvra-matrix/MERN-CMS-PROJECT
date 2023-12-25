const express = require("express");

const rourte = express.Router();

const authController = require("../controller/auth");

rourte.post("/signup", authController.signup);

module.exports = rourte;
