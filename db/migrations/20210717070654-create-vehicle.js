'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('vehicles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      licence: {
        type: Sequelize.STRING,
        unique: true
      },
      model: {
        type: Sequelize.STRING
      },
      engine: {
        type: Sequelize.STRING,
        unique: true
      },
      chasis: {
        type: Sequelize.STRING,
        unique: true
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('vehicles');
  }
};