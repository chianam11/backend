//Tương ứng với model User
const { Administrator, Role } = require("../models/index");
const Repository = require("../core/repository");
module.exports = class extends Repository {
  getModel() {
    return Administrator;
  }

  getLastestUser() {
    return this.findAll({
      order: [["id", "desc"]],
      attributes: ["id", "first_name", "last_name", "email", "phone"],
      limit: 10,
    });
  }
  getUserPermissionRepository(id) {
    return this.findByPk(id, {
      include: {
        model: Role,
        as: "roles",
      },
    });
  }
};
