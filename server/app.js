const express = require("express");
const mongoos = require("mongoose");
const multer = require("multer");
require("dotenv").config();

const app = express();

const MONGO_URL = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}mymongoinit.6md0cxy.mongodb.net/dalle?retryWrites=true&w=majority`;

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, PATCH, PUT"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type , Authorization");
  next();
});

const publicRoutes = require("./routes/public");
const authRoutes = require("./routes/auth");

app.use(publicRoutes);
app.use("/auth", authRoutes);

mongoos
  .connect(MONGO_URL)
  .then((result) => {
    app.listen(3030);
  })
  .catch((err) => {
    console.log(err);
  });
