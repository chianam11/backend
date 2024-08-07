"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("tracking_details", "quantity", {
      type: Sequelize.INTEGER,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("tracking_details", "quantity", {
      type: Sequelize.INTEGER,
    });
  },
};
