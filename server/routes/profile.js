const express = require("express");

const routes = express.Router();
const { body } = require("express-validator");

const profileController = require("../controller/Profile");
const authMillerware = require("../middleware/auth");

routes.get("/profile", authMillerware, profileController.getProfile);
routes.post("/genotp", authMillerware, profileController.sendOtp);
routes.put("/editprofile", authMillerware, profileController.editProfile);
routes.post("/addcategory", authMillerware, profileController.addCategory);
routes.get("/getcategory", authMillerware, profileController.getCategory);
routes.put(
  "/updatepassword",
  [
    body("oldpass").trim().isLength({ min: 6 }).withMessage("invalid password"),
    body("newpass").trim().isLength({ min: 6 }).withMessage("invalid password"),
    body("conpass").trim().isLength({ min: 6 }).withMessage("invalid password"),
  ],
  authMillerware,
  profileController.updatePassword
);
module.exports = routes;
