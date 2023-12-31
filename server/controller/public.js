const Post = require("../model/Post");

const formatDate = (date) => {
  let splitDate = date.split(",")[0].split("/");
  date = splitDate[1] + "/" + splitDate[0] + "/" + splitDate[2];
  return date;
};

exports.getPublishPost = (req, res, next) => {
  const pageNumber = req.query.page || 1;
  const categoryId = req.query.catId;
  let searchData = req.query.search;

  const perPage = 7;
  let totalItem;
  let totalPage;
  let condition;

  const titleCondition = {
    title: { $regex: searchData, $options: "i" },
  };

  const tagCondition = {
    tag: { $regex: searchData, $options: "i" },
  };

  if (categoryId === "All") {
    condition = {
      status: "publish",
      $or: [titleCondition, tagCondition],
    };
  } else {
    condition = {
      status: "publish",
      category: categoryId,
      $or: [titleCondition, tagCondition],
    };
  }

  Post.find(condition)
    .countDocuments()
    .then((count) => {
      totalItem = count;

      totalPage = Math.ceil(totalItem / perPage);
      return Post.find(condition)
        .populate("user", "name")
        .populate("category", "name")
        .skip((pageNumber - 1) * perPage)
        .limit(perPage);
    })
    .then((post) => {
      if (post.length === 0) {
        const error = new Error("no post available");
        error.statusCode = 404;
        throw error;
      }

      const postData = post.map((data) => {
        let date = formatDate(data.createAt);
        return {
          image: data.image,
          postId: data._id,
          title: data.title,
          desc: data.desc,
          date: date,
          user: data.user,
          category: data.category,
        };
      });
      res.status(200).json({
        message: "all post got",
        posts: postData,
        totalItem: totalItem,
        totalPage: totalPage,
        currentPage: pageNumber,
      });
    })
    .catch((err) => {
      console.log(err);
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.postPublishPost = (req, res, next) => {
  const title = req.body.title;
  const postId = req.body.postId;

  Post.findOne({ _id: postId })
    .populate("user", "name")
    .then((post) => {
      if (!post) {
        const error = new Error("no post found");
        error.statusCode = 401;
        throw error;
      }

      post.views += 1;
      return post.save();
    })
    .then((post) => {
      const createDate = formatDate(post.createAt);
      let updateDate;
      if (post.upadteAt) {
        updateDate = formatDate(post.upadteAt);
      }

      res.status(200).json({
        message: "post got",
        post: {
          post: post,
          createDate: createDate,
          updateDate: updateDate || "",
        },
      });
    })
    .catch((err) => {
      console.log(err);
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getFeaturesPost = (req, res, next) => {
  Post.find({ status: "publish" })
    .sort({ views: -1 })
    .populate("user", "name")
    .limit(10)
    .then((post) => {
      if (post.length === 0) {
        const error = new Error("no post found");
        error.statusCode = 401;
        throw error;
      }

      const postData = post.map((data) => {
        let date = formatDate(data.createAt);
        return {
          postId: data._id,
          title: data.title,
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
