//file permission.middleware.js

const { Role, Permission, Adminstrator } = require("../../models/index");
const nonSecurePath = ["/api/v1/admin/auth/login","/api/v1/admin/products"];
module.exports = (req, res, next) => {
  if (nonSecurePath.includes(req.path)) {
    return next();
  }
  return next();
};
