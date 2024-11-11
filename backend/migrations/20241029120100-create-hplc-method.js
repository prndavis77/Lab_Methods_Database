'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('HPLCMethods', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      columnType: {
        type: Sequelize.STRING
      },
      mobilePhase: {
        type: Sequelize.STRING
      },
      flowRate: {
        type: Sequelize.STRING
      },
      elution: {
        type: Sequelize.STRING
      },
      temperature: {
        type: Sequelize.STRING
      },
      detector: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('HPLCMethods');
  }
};