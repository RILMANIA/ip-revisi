'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Builds', 'artifact', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.changeColumn('Builds', 'notes', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Builds', 'artifact', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.changeColumn('Builds', 'notes', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  }
};
