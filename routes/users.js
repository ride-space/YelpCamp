const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");
const User = require("../models/user");

router.get("/register", (req, res) => {
  res.render("users/register");
});
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    console.log(registeredUser);
    req.flash("success", "Yelp Campへようこそ!!");
    res.redirect("/campgrounds");
  } catch (error) {
    req.flash("error", error.message);
    res.redirect("/register");
  }
});

module.exports = router;
