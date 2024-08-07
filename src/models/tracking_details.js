// Trong file models/tracking_details.js
'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class TrackingDetail extends Model {
    static associate(models) {
      TrackingDetail.belongsTo(models.UserOrder, { foreignKey: 'order_id' });
    TrackingDetail.belongsTo(models.PhoneByBrand, { foreignKey: 'product_id' });
    }
  }

  TrackingDetail.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'UserOrder',
        key: 'id',
      },
    },
    user_id:{
      type: DataTypes.INTEGER,
      
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
   
  }, {
    sequelize,
    modelName: 'TrackingDetail',
    tableName: 'tracking_details',
    createdAt: "created_at",
    updatedAt: "updated_at",
    
  });

  return TrackingDetail;
};
