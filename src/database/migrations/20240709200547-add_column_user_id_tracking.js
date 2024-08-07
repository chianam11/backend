"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("tracking_details", "user_id", {
      type: Sequelize.INTEGER,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("tracking_details", "user_id", {
      type: Sequelize.INTEGER,
    });
  },
};
