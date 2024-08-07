//Tương ứng với model User
const { Permission } = require("../models/index");
const Repository = require("../core/repository");
module.exports = class extends Repository {
  getModel() {
    return Permission;
  }

  getPermission() {
    return this.findAll({
      order: [["id", "asc"]],
    });
  }
  async createPermissions(data) {
    const permissions = Array.isArray(data) ? data : [data];
    try {
      if (permissions.length) {
        const permissionIntances = await Promise.all(
          permissions.map(async (value) => {
            const [permissionIntance] = await this.findOrCreate({
              where: { value: value.trim() },
              default: { value: value.trim() },
            });
            return permissionIntance;
          })
        );
        return permissionIntances;
      }
    } catch {
      console.error("errr");
    }
  }
};
