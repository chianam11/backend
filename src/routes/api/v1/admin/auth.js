//file auth.js

var express = require("express");
var router = express.Router();
const passport = require("passport");
const { verifyToken } = require("../../../../utils/jwt");
const {
  errorResponse,
  successResponse,
} = require("../../../../helpers/response");

const authMiddleware = require("../../../../middlewares/api/auth.middleware");
const authAdminController = require("../../../../controllers/admin/api/v1/auth.controller");

const adminAuthRouter = (app) => {
  router.post("/register",authAdminController.register)
  router.post(
    "/login",
    passport.authenticate("local", {
      failureFlash: true,
    }),

    authAdminController.login
  );

  router.get("/logout", authMiddleware, (req, res) => {
    req.logout((error) => {
      if (!error) {
        return successResponse(res, 200, "Success");
      }
      return errorResponse(res, 500, "Internal Server Error");
    });
  });
  router.post("/refresh", authAdminController.refresh);

  router.get("/profile", authMiddleware, async (req, res) => {
    res.json({});
  });

  return app.use("/api/v1/admin/auth", router);
};

module.exports = adminAuthRouter;
