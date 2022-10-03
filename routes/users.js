const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");
const User = require("../models/user");
const passport = require("passport");

router.get("/register", (req, res) => {
  res.render("users/register");
});
router.post("/register", async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (error) => {
      if (error) {
        return next(error);
      }
      req.flash("success", "Yelp Campへようこそ!!");
      res.redirect("/campgrounds");
    });
  } catch (error) {
    req.flash("error", error.message);
    res.redirect("/register");
  }
});

router.get("/login", (req, res) => {
  res.render("users/login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
  }),
  (req, res) => {
    req.flash("success", "お帰りなさい!");
    const redirectUrl = req.session.returnTo || "/campgrounds";
    res.redirect(redirectUrl);
  }
);

router.post("/logout", (req, res) => {
  req.logout((error) => {
    if (error) {
      req.flash("error", "ログアウトに失敗しました。");
      return res.redirect("/campgrounds");
    }
  });
  req.flash("success", "ログアウトしました");
  res.redirect("/campgrounds");
});
module.exports = router;
