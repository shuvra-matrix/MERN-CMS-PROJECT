const express = require("express");

const routes = express.Router();

const profileController = require("../controller/Profile");
const authMillerware = require("../middleware/auth");

routes.get("/profile", authMillerware, profileController.getProfile);

module.exports = routes;
