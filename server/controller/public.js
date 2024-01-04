const Post = require("../model/Post");

const formatDate = (date, timeZone = "UTC") => {
  const options = {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  const newdate = date.toLocaleString("en-US", options);
  const splitDate = newdate.split("/");
  const day = splitDate[1];
  const month = splitDate[0];
  const year = splitDate[2];
  const formatDate = day + "/" + month + "/" + year;
  return formatDate;
};

exports.getPublishPost = (req, res, next) => {
  const pageNumber = req.query.page || 1;
  const categoryId = req.query.catId;
  let searchData = req.query.search;
  const userTimeZone = req.query.timeZone;

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
    .sort({ createdAt: -1 })
    .countDocuments()
    .then((count) => {
      totalItem = count;

      totalPage = Math.ceil(totalItem / perPage);
      return Post.find(condition)
        .sort({ createdAt: -1 })
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
        let date = formatDate(data.createdAt, userTimeZone);
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
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.postPublishPost = (req, res, next) => {
  const postId = req.body.postId;
  const timeZone = req.body.timeZone;

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
      const createDate = formatDate(post.createdAt, timeZone);
      let updateDate;
      if (post.updatedAt) {
        updateDate = formatDate(post.updatedAt, timeZone);
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
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
