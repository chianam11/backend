const UserRepository = require("../repositories/user.repository");
const userRepository = new UserRepository();
module.exports = {
  getUsers() {
    return userRepository.getLastestUser();
  },
  getUserPermissionServices(id) {
    return userRepository.getUserPermissionRepository(id);
  },
};
