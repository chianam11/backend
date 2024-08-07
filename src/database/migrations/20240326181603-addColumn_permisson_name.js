"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("permissions", "name", {
      type: Sequelize.STRING(20),
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("permissions", "name", {
      type: Sequelize.STRING(20),
    });
  },
};
