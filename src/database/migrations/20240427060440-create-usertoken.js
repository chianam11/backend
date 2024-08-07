"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("user_tokens", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      refresh_token: {
        type: Sequelize.STRING,
      },
      user_id: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE", //Khi xóa user --> Xóa token liên quan
        references: {
          model: {
            tableName: "administrators",
          },
          key: "id",
        },
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("user_tokens");
  },
};
