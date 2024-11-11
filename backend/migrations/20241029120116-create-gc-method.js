'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('GCMethods', {
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
      sampleType: {
        type: Sequelize.STRING
      },
      carrierGas: {
        type: Sequelize.STRING
      },
      injectionTemperature: {
        type: Sequelize.STRING
      },
      flowRate: {
        type: Sequelize.STRING
      },
      temperatureProgram: {
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
    await queryInterface.dropTable('GCMethods');
  }
};