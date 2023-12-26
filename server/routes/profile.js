const express = require("express");

const routes = express.Router();

const profileController = require("../controller/Profile");
const authMillerware = require("../middleware/auth");

routes.get("/profile", authMillerware, profileController.getProfile);
routes.post("/genotp", authMillerware, profileController.sendOtp);
routes.put("/editprofile", authMillerware, profileController.exitProfile);
module.exports = routes;
