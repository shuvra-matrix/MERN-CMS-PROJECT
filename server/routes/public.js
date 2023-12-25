const express = require("express");

const rourte = express.Router();

rourte.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Hi Wecome to my Blog API",
  });
});

module.exports = rourte;
