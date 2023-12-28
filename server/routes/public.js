const express = require("express");

const rourte = express.Router();
const publicController = require("../controller/public");

rourte.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Hi Wecome to my Blog API",
  });
});

rourte.get("/getpost", publicController.getPublishPost);
rourte.post("/getsinglepost", publicController.postPublishPost);
rourte.get("/getfeaturespost", publicController.getFeaturesPost);

module.exports = rourte;
