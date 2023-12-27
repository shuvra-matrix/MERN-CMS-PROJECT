const Post = require("../model/Post");

exports.getPublishPost = (req, res, next) => {
  Post.find({ status: "publish" })
    .populate("user", "name")
    .then((post) => {
      if (post.length === 0) {
        const error = new Error("no post available");
        error.statusCode = 404;
        throw error;
      }

      const postData = post.map((data) => {
        let splitDate = data.createAt.split(",")[0].split("/");
        let date = splitDate[1] + "/" + splitDate[0] + "/" + splitDate[2];
        return {
          image: data.image,
          postId: data._id,
          title: data.title,
          desc: data.desc,
          date: date,
          user: data.user,
        };
      });

      res.status(200).json({ message: "all post got", posts: postData });
    })
    .catch((err) => {
      console.log(err);
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
