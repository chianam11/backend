//file admin.js

const express = require("express");
const router = express.Router();
const rolesController = require("../../../../controllers/admin/api/v1/roles.controller");
const usersController = require("../../../../controllers/admin/api/v1/users.controller");

const adminRouteV1 = (app) => {
  router.get("/", usersController.index);
  router.get("/roles", rolesController.roles);
  router.post("/roles/add", rolesController.handleAdd);
  router.get("/roles/edit/:id", rolesController.getRoles);
  router.post(
    "/roles/edit/:id",

    rolesController.handleRoleEdit
  );
  router.delete("/roles/delete/:id", rolesController.handleDelete);
  router.get("/permissions/:id", rolesController.getUsersPermission);
  router.post("/permissions/:id", rolesController.addUserPermissions);

  return app.use("/api/v1/admin", router);
};

module.exports = adminRouteV1;
