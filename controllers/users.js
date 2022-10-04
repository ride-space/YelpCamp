const User = require("../models/user");

module.exports.renderRegister = (req, res) => {
  res.render("users/register");
};

module.exports.register = async (req, res, next) => {
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
};

module.exports.renderLogin = (req, res) => {
  res.render("users/login");
};

module.exports.login = (req, res) => {
  req.flash("success", "お帰りなさい!");
  const redirectUrl = req.session.returnTo || "/campgrounds";
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res) => {
  req.logout((error) => {
    if (error) {
      req.flash("error", "ログアウトに失敗しました。");
      return res.redirect("/campgrounds");
    }
  });
  req.flash("success", "ログアウトしました");
  res.redirect("/campgrounds");
};
