const PermissionRepositories = require("../repositories/permissions.repository");
const PermissionRepository = new PermissionRepositories();
module.exports = {
  getPermission() {
    return PermissionRepository.getPermission();
  },
  createPermission(options) {
    return PermissionRepository.createPermissions(options);
  },
};
