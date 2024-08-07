//Tương ứng với model User
const { Role, Permission } = require("../models/index");
const Repository = require("../core/repository");
module.exports = class extends Repository {
  getModel() {
    return Role;
  }

  postRole(values) {
    return this.create({ name: values.trim() });
  }
  getRole() {
    return this.findAll({ order: [["id", "desc"]] });
  }
  getRoleParams(id) {
    return this.findByPk(id, {
      include: {
        model: Permission,
        as: "permissions",
      },
    });
  }
  roleEdit(body = {}) {
    const { name: value, id } = body;
    return this.update(
      {
        name: value,
      },
      {
        where: { id },
      }
    );
  }
};
