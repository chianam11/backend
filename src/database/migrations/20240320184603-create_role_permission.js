"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("roles_permissions", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      roles_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "roles",
        },
        key: "id",
      },
      permission_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "permissions",
        },
        key: "id",
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
    await queryInterface.dropTable("roles_permissions");
  },
};
