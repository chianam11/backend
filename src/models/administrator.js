"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Administrator extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Administrator.belongsToMany(models.Role, {
        foreignKey: "administrator_id",
        through: "administrators_roles",
        as: "roles",
      });
      Administrator.hasMany(models.UserOrder, { foreignKey: 'user_id' });
    }
  }
  Administrator.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      provider_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Administrator",
      tableName: "administrators",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Administrator;
};
