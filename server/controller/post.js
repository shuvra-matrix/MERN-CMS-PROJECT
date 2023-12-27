const User = require("../model/User");
const Post = require("../model/Post");
const PostCategory = require("../model/PostCategory");
const { Readable } = require("nodemailer/lib/xoauth2");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: "dqone7ala",
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_SECRET,
});

exports.addPost = (req, res, next) => {
  console.log(req.body);
  console.log(req.file);
  const { title, category, content, desc, imageSource, status, tag } = req.body;
  const imageBuffer = req.file.buffer;
  console.log(imageBuffer);
  const imageName = req.file.originalname;
  const uniqueFileName =
    imageName + "-" + Date.now() + "-" + Math.round(Math.random() * 1e9);

  let imageUrl;
  const options = {
    unique_filename: false,
    overwrite: true,
    public_id: "Blog/image" + uniqueFileName,
  };

  const uploadImage = async (imageBuffer) => {
    try {
      const writeBufferFile = cloudinary.uploader.upload_stream(
        options,
        (error, result) => {
          if (error) {
            console.log(error);
            const err = new Error(error);
            err.statusCode = 403;
            throw err;
          }
          imageUrl = result.secure_url;
          const currentDate = new Date();
          const options = { timeZone: "Asia/Kolkata" };
          const istDate = currentDate.toLocaleString("en-US", options);
          const post = new Post({
            title: title,
            content: content,
            desc: desc,
            category: category,
            image: imageUrl,
            imgSource: imageSource,
            imageName: imageName,
            tag: tag,
            status: status,
            user: req.userId,
            createAt: istDate,
          });

          let postId;

          post
            .save()
            .then((result) => {
              if (!result) {
                const error = new Error("server error");
                error.statusCode = 404;
                throw error;
              }

              postId = result._id;

              return PostCategory.findById(category);
            })
            .then((category) => {
              if (!category) {
                const error = new Error("server error");
                error.statusCode = 404;
                throw error;
              }

              category.posts.push(postId);

              return category.save();
            })
            .then((result) => {
              if (!result) {
                const error = new Error("server error");
                error.statusCode = 404;
                throw error;
              }
              return User.findById(req.userId);
            })
            .then((user) => {
              if (!user) {
                const error = new Error("server error");
                error.statusCode = 404;
                throw error;
              }

              user.posts.push(postId);
              return user.save();
            })
            .then((result) => {
              if (!result) {
                const error = new Error("server error");
                error.statusCode = 404;
                throw error;
              }

              res.status(201).json({ message: "post add done" });
            })
            .catch((err) => {
              console.log(err);
              if (!err.statusCode) {
                err.statusCode = 500;
              }

              next(err);
            });
        }
      );
      const readableStream = Readable.from(imageBuffer);
      readableStream.pipe(writeBufferFile);
    } catch (err) {
      console.log(err);
      if (!err.statusCode) {
        err.statusCode = 500;
        next(err);
      }
    }
  };

  uploadImage(imageBuffer);
};