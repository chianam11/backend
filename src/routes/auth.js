require("dotenv");
var express = require("express");
var router = express.Router();
const passport = require("passport");
const authController = require("../controllers/api/v1/auth.controller");
const { ServerResponse } = require("http");
const { errorResponse, successResponse } = require("../helpers/response");
const { User } = require("../models/index");
router.get("/signup", authController.signup);
router.post(
  "/login",
  passport.authenticate(
    "local",
    {
      successMessage: "thanh cong",
      failureMessage: "that bai",
      failureFlash: true,
      badRequestMessage: "Vui lòng nhập email và mật khẩu",
    },
    async (req, res) => {
      // const user_id = req.user;

      return res.json({});
    }
  )
);
router.get("/logout", (req, res) => {
  req.logout((error) => {
    if (!error) {
      return res.redirect("/auth/login");
    }
  });
});
router.get("/google", (req, res) => {
  const emptyResponse = new ServerResponse(req);
  passport.authenticate(
    "google",
    {
      scope: ["email", "profile"],
    },
    (err, user, info) => {}
  )(req, emptyResponse);

  const url = emptyResponse.getHeader("location");
  return res.status(200).json({
    status: 200,
    message: "Thành công",
    result: {
      urlRedirect: url,
    },
  });
});
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureFlash: true,
    failureRedirect: `${process.env.CLIENT_URL}/login`,
    successRedirect: process.env.CLIENT_URL,
    session: false,
  }),
  async (req, res) => {
    try {
      const data = req.user;
      if (!data) {
        return errorResponse(res, 400, "Bad request");
      }
    } catch {
      errorResponse(req, 500, "Server error");
    }
  }
);

router.get("/profile", async (req, res) => {
  return res.json({});
});
module.exports = router;
