"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("administrators", "provider_id", {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: "providers",
        },
        key: "id",
      },
      onDelete:"CASCADE",
      onUpdate:"CASCADE"
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("administrators", "provider_id");
  },
};
