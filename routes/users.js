const express = require("express");
const router = express.Router({ mergeParams: true });
const passport = require("passport");
const users = require("../controllers/users");

router.route("/register").get(users.renderRegister).post(users.register);

router
  .route("/login")
  .get(users.renderLogin)
  .post(
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    users.login
  );

router.post("/logout", users.logout);
module.exports = router;
