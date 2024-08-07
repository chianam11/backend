"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("administrators_roles", {
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
      administrator_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "administrators",
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
    await queryInterface.dropTable("administrators_roles");
  },
};
