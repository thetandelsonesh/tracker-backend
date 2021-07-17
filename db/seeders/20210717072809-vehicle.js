'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('vehicles', [
      {
        id: 1,
        licence: 'ADTEST1',
        model: 'MITSUBISHI',
        engine: '1DZ0037452',
        chasis: '839F23-23616',
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        id: 2,
        licence: 'ADTEST2',
        model: 'TOYOTA',
        engine: '1HQ0039202',
        chasis: '606F30-98714',
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('vehicles', null, {});
  }
};
