'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Brand extends Model {
    static associate(models) {
      // Brand.hasMany(models.PhoneByBrand,{
      //   foreignKey:"id",
      //   as:"PhoneByBrand"
      // })
    }
  }
  Brand.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }, {
    sequelize,
    modelName: 'Brand',
    tableName: 'brands',
  });
  return Brand;
};
