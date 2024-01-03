const express = require("express");
const mongoos = require("mongoose");
const multer = require("multer");
const requestIp = require("request-ip");
require("dotenv").config();

const app = express();

const port = "3030";
const MONGO_URL = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}mymongoinit.6md0cxy.mongodb.net/blog?retryWrites=true&w=majority`;

app.use(express.json());
app.use(requestIp.mw());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, PATCH, PUT"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type , Authorization");
  next();
});

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only JPEG, PNG, and JPG are allowed."));
    }
  },
});

app.use(upload.single("image"));

const publicRoutes = require("./routes/public");
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
const postRoutes = require("./routes/post");

app.use("/public", publicRoutes);
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);
app.use("/post", postRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode;
  const message = error.messsage;
  const data = error.data;
  res
    .status(status || 500)
    .json({ message: message, data: data, error: "yes", errors: error });
});

mongoos
  .connect(MONGO_URL)
  .then((result) => {
    app.listen(process.env.PORT || port, () => {
      console.log(`listning to the port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
