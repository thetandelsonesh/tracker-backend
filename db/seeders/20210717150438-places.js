'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const polygon = { type: 'Polygon', coordinates: [
        [
          [73.5598715332623,18.7128121962049], [73.7795980957623,18.858427375322], [74.0817221191998,18.8298343351168],
          [74.1805990723248,18.6633784989781], [74.2575033691998,18.4420517762916], [74.2025717285748,18.2569599275397],
          [74.0460165527935,18.1030009147098], [73.743892529356,18.0272764656119], [73.568111279356,18.074281691122],
          [73.4774740723248,18.2100037896017], [73.3538778809185,18.4733152757346], [73.4088095215435,18.6659806320587],
          [73.5598715332623,18.7128121962049]
        ]
      ]};

    await queryInterface.bulkInsert('places', [
      {
        id: 1,
        name: 'Pune',
        border: Sequelize.fn('ST_GeomFromGeoJSON', JSON.stringify(polygon)),
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('places', null, {});
  }
};