'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('vehicles', [
      {
        id: 1,
        license: 'ADTEST1',
        model: 'MITSUBISHI',
        engine: '1DZ0037452',
        chassis: '839F23-23616',
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        id: 2,
        license: 'ADTEST2',
        model: 'TOYOTA',
        engine: '1HQ0039202',
        chassis: '606F30-98714',
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('vehicles', null, {});
  }
};
