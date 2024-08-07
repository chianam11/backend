'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserOrder extends Model {
    static associate(models) {
      // define association here
      UserOrder.belongsTo(models.Administrator, { foreignKey: 'user_id' });
      UserOrder.hasMany(models.TrackingDetail, { foreignKey: 'order_id' });
    }
  }
  UserOrder.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
   
  }, {
    sequelize,
    createdAt: "created_at",
    updatedAt: "updated_at",
    modelName: 'UserOrder',
    tableName: 'user_orders',  // ensure this matches your actual table name
  });
  return UserOrder;
};

  