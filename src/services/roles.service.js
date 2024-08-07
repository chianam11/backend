const RolesRepositories = require("../repositories/roles.repository");
const RolesRepository = new RolesRepositories();
module.exports = {
  getRoles: () => {
    return RolesRepository.getRole();
  },
  postRole(name) {
    return RolesRepository.postRole(name);
  },
  roleById(id) {
    return RolesRepository.getRoleParams(id);
  },
  roleUpdate(body) {
    return RolesRepository.roleEdit(body);
  },
};
