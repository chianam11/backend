'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('phone_by_brand', {
      phone_id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
      },
      brand_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      brand_name:{
        type: Sequelize.STRING

      },
      phone_name:{
        type: Sequelize.STRING

      },
      id: {
        type: Sequelize.STRING
      },
      image_url:{
        type:Sequelize.STRING
      },
      description:{
        type:Sequelize.TEXT

      },
      price:{
        type:Sequelize.INTEGER
      },
      stock_quantity:{
        type:Sequelize.INTEGER
      },
      
      created_at: {
        type: Sequelize.DATE,
      },
      updated_at: {
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('phone_by_brand');
  }
};
