const ExpressError = require("./utils/ExpressError");
const { campgroundSchema,reviewSchema } = require("./schemas");
const Campground = require("./models/campground");
const Review = require("./models/review");




module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash("error", "ログインしてください");
    return res.redirect("/login");
  }
  next();
};

module.exports.validateCampground = (req, res, next) => {
  const { error } = campgroundSchema.validate(req.body);
  if (error) {
    const message = error.details.map((detail) => detail.message).join(",");
    throw new ExpressError(message, 404);
  } else {
    next();
  }
};

module.exports.isAuthor = async (req, res, next) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  if (!campground.author.equals(req.user._id)) {
    req.flash("error", "そのアクションの権限がありあません");
    return res.redirect(`/campgrounds/${campground._id}`);
  } else {
    next();
  }
};
module.exports.isReviewAuthor = async (req, res, next) => {
  const {id, reviewId } = req.params;
  const review = await Review.findById(reviewId);
  if (!review.author.equals(req.user._id)) {
    req.flash("error", "そのアクションの権限がありあません");
    return res.redirect(`/campgrounds/${id}`);
  } else {
    next();
  }
};

module.exports.ValidateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const message = error.details.map((detail) => detail.message).join(",");
    throw new ExpressError(message, 404);
  } else {
    next();
  }
};
