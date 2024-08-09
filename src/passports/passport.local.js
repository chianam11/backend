const bcrypt = require("bcrypt");
const { User, Provider, Administrator } = require("../models/index");
const LocalStrategy = require("passport-local").Strategy;
module.exports = new LocalStrategy(
  {
    usernameField: "username",
    passwordField: "password",
  },
  async (username, password, done) => {
    const user = await Administrator.findOne({
      where: { username },
    });
    if (!user) {
      return done(null, false, {
        message: "Tài khoản không tồn tại",
      });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return done(null, false, {
        message: "Mật khẩu không chính xác",
      });
    }
    return done(null, user);
  }
);
