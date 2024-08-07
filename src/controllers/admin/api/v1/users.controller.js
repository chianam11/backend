const userService = require("../../../../services/user.service");

module.exports = {
  index: async (req, res) => {
    const users = await userService.getUsers();
    res.json({ users });
  },
};
