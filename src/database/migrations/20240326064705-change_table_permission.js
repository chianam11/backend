"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn("permissions", "createdAt", "created_at");
    await queryInterface.renameColumn("permissions", "updatedAt", "updated_at");
  },

  async down(queryInterface, Sequelize) {
    // await queryInterface.renameColumn("permissions", "createdAt", "created_at");
    // await queryInterface.renameColumn("permissions", "updatedAt", "updated_at");
  },
};
