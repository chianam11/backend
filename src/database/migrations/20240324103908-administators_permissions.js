"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("administrators_premissions", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      administrator_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "administrators",
          },
          key: "id",
        },
      },
      permission_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "permissions",
          },
          key: "id",
        },
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
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
