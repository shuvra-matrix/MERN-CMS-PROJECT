const express = require("express");

const auth = require("../middleware/auth");

const routes = express.Router();
const postController = require("../controller/post");

routes.post("/addpost", auth, postController.addPost);
routes.get("/getpost", auth, postController.getProfilePost);
routes.post("/getpostdata", auth, postController.getEditPostData);
routes.put("/editpostdata", auth, postController.postEditData);
routes.delete("/postdelete", auth, postController.deletePost);

module.exports = routes;
