//file app.js
require("dotenv").config();
require("module-alias/register");
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const passportLocal = require("./passports/passport.local");
const passportGoogle = require("./passports/passport.google");

const cors = require("cors");
const validateMiddleware = require("./middlewares/validate");

//router admin
const adminRouteV1 = require("./routes/api/v1/admin/admin");
const adminAuthRouter = require("./routes/api/v1/admin/auth");
// router product
const productRouter = require("./routes/api/v1/admin/products");
const orderProductRouter = require("./routes/api/v1/admin/orderProduct");
// model
const { Administrator } = require("./models/index");

//
const app = express();
//
const authMiddleware = require("./middlewares/api/auth.middleware");
const permissionMiddleware = require("./middlewares/api/permission.middleware");

app.use(
  session({
    secret: "f8",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.use("local", passportLocal);
passport.use("google", passportGoogle);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  const user = await Administrator.findByPk(id);
  done(null, user);
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const whitelist = ["*"];
const corsOptions = {
  origin: function (origin, callback) {
    const mode = process.env.NODE_ENV || "development";
    if (mode === "development") {
      return callback(null, true);
    }
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(validateMiddleware);
app.use(cors({ credentials: true,origin:["http://localhost:3000","http://localhost:5173","http://localhost:5174","http://localhost:3001"] }));
productRouter(app);
app.all("*", authMiddleware, permissionMiddleware);

adminAuthRouter(app);
adminRouteV1(app);
orderProductRouter(app)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});

module.exports = app;
