const express = require("express");

const auth = require("../middleware/auth");

const routes = express.Router();
const postController = require("../controller/post");

routes.post("/addpost", auth, postController.addPost);

module.exports = routes;
