const PermissionServices = require("../../../../services/permission.service");
const RoleServices = require("../../../../services/roles.service");
const UserServices = require("../../../../services/user.service");
const { Role, Permission, Administrator } = require("../../../../models/index");
const {
  successResponse,
  errorResponse,
} = require("../../../../helpers/response");

module.exports = {
  roles: async (req, res) => {
    const { id } = req.params;

    try {
      const rolesAll = await RoleServices.getRoles();

      if (!rolesAll) {
        errorResponse(res, 400, "Server Err");
      }
      successResponse(res, 200, "Success", rolesAll);
    } catch {
      errorResponse(res, 400, "Server Err");
    }
  },
  getRoles: async (req, res) => {
    const { id } = req.params;
    try {
      const data = await RoleServices.roleById(id);
      res.json({ data });
    } catch {}
  },

  handleAdd: async (req, res) => {
    try {
      const { name, isPermissions } = req.body;
      const role = await RoleServices.postRole(name);
      const permission = await PermissionServices.createPermission(
        isPermissions
      );
      await role.addPermissions(permission);
      successResponse(res, 200, "success");
    } catch {
      errorResponse(req, 400, "Server Error");
    }
  },
  handleRoleEdit: async (req, res) => {
    const { id } = req.params;
    const { isPermissions } = req.body;
    try {
      if (!isPermissions) {
        isPermissions = [];
      }
      await RoleServices.roleUpdate(req.body);
      const role = await Role.findByPk(id);
      if (role && isPermissions.length > -1) {
        //Lấy được 1 mảng chứa danh sách các instance của từng permission (Đã được thêm vào database hoặc được lấy ra từ database)
        const permissionInstances = await Promise.all(
          isPermissions.map(async (value) => {
            const [permissionInstance] = await Permission.findOrCreate({
              where: { value: value.trim() },
              defaults: { value: value.trim() },
            });
            return permissionInstance;
          })
        );
        await role.setPermissions(permissionInstances);
        return successResponse(res, 200, "success");
        // Gửi phản hồi thành công và kết thúc xử lý bằng lệnh return
      }

      // const role1 = await Role.findByPk(id, {
      //   include: {
      //     model: Permission,
      //     as: "permission",
      //   },
      // });
    } catch {
      // Gửi phản hồi lỗi
      errorResponse(res, 400, "Server Err");
    }

    // Bạn không cần gọi res.json() ở đây nữa vì đã gửi phản hồi ở trên
  },
  handleDelete: async (req, res) => {
    const { id } = req.params;
    try {
      const role = await Role.findByPk(id, {
        include: [
          {
            model: Permission,
            as: "permissions",
          },
          {
            model: Administrator,
            as: "administrators",
          },
        ],
      });
      if (role) {
        await role.removePermissions(role.permissions);

        await role.removeAdministrators(role.administrators);

        await role.destroy();

        successResponse(res, 200, "Success");
      }
    } catch (e) {
    }
  },
  //addUserPermissions thêm quyền cho người dùng
  addUserPermissions: async (req, res) => {
    const { id } = req.params;
    const rolesCheck = req.body.addRoles;
    try {
      if (!rolesCheck) {
        rolesCheck = [];
      }
      const roles = Array.isArray(rolesCheck) ? rolesCheck : [rolesCheck];
      const user = await Administrator.findByPk(id);
      if (user) {
        const roleIntances = await Promise.all(
          roles.map((roleId) => Role.findByPk(roleId))
        );

        await user.setRoles(roleIntances);
        return successResponse(res, 200, "Success");
      } else {
        return errorResponse(req, 401, "Server Error");
      }
    } catch (error) {
      console.error(error);
    }
  },
  getUsersPermission: async (req, res) => {
    const { id } = req.params;

    try {
      const userPermission = await UserServices.getUserPermissionServices(id);
      res.json({ userPermission });
    } catch {}
  },
};
