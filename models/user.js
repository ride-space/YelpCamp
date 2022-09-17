const mongoose = require("mongoose");
const { Schema } = mongoose;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    require: true,
    unique: true,
  },
});

userSchema.plugin(passportLocalMongoose, {
  errorMessages: {
    MissingPasswordError: "パスワードが与えられていない",
    AttemptTooSoonError: "現在、アカウントはロックされています。後で再試行する",
    TooManyAttemptsError: "ログイン失敗回数が多すぎてアカウントがロックされた",
    NoSaltValueStoredError: "認証ができない。ソルト値が保存されていない",
    IncorrectPasswordError: "パスワードまたはユーザー名が正しくない",
    IncorrectUsernameError: "パスワードまたはユーザー名が正しくない",
    MissingUsernameError: "ユーザー名が指定されていない",
    UserExistsError: "そのユーザー名は既に使われています",
  },
});

module.exports = mongoose.model("User", userSchema);
