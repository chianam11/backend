"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Role.belongsToMany(models.Permission, {
        foreignKey: "roles_id",
        through: "roles_permissions",
        as: "permissions",
      });
      Role.belongsToMany(models.Administrator, {
        foreignKey: "roles_id",
        through: "administrators_roles",
        as: "administrators",
      });
    }
  }
  Role.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
    },
    {
      sequelize,
      createdAt: "created_at",
      updatedAt: "updated_at",
      modelName: "Role",
      tableName: "roles",
    }
  );

  return Role;
};
