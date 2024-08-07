'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PhoneByBrand extends Model {
    static associate(models) {
      // define association here
    PhoneByBrand.belongsToMany(models.UserOrder, {
        foreignKey: 'product_id',
        through:"user_order_details",
      
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE' ,
         as: 'order',
      }); 
      PhoneByBrand.hasMany(models.TrackingDetail, { foreignKey: 'product_id' });
    }
      
  }
  PhoneByBrand.init({
    phone_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    brand_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    brand_name: {
      type: DataTypes.STRING,
    },
    phone_name: {
      type: DataTypes.STRING,
    },
    id: {
      type: DataTypes.STRING,
    },
    image_url: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    price: {
      type: DataTypes.INTEGER,
    },
    stock_quantity: {
      type: DataTypes.INTEGER,
    },
    created_at: {
      type: DataTypes.DATE,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
   
  }, {
    sequelize,  
    modelName: 'PhoneByBrand',
    tableName: 'phone_by_brand', 
    createdAt: "created_at",
    updatedAt: "updated_at",
  });
  return PhoneByBrand;
};


