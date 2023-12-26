const User = require("../model/User");

exports.getProfile = (req, res, next) => {
  console.log(req.userId);
  User.findById(req.userId)
    .then((user) => {
      if (!user) {
        const error = new Error("user not found");
        error.statusCode = 400;
        throw error;
      }

      res.status(200).json({
        message: "user found",
        userData: {
          name: user.name,
          email: user.email,
          location: user.location || "",
          bio: user.bio || "",
          website: user.website || "",
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
