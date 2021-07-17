'use strict';

const csv = require('csv-parser');
const path = require('path');
const fs = require('fs');

const readCSV = (id, filePath, Sequelize) => {
  return new Promise((resolve, reject) => {
    let data = [];
    try{
      fs.createReadStream(filePath).pipe(csv())
        .on('data', (row) => {
          const point = { type: 'Point', coordinates: [Number(row.lng), Number(row.lat)] };

          const rowData = {
            vehicleId: id,
            location: (row.lat && row.lng) ? Sequelize.fn('ST_GeomFromGeoJSON', JSON.stringify(point)) : null,
            trackedAt: row.time ? new Date(row.time) : null,
            createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
            updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
          }
          data.push(rowData);
        })
        .on('end', () => {
          console.log('CSV file successfully processed');
          resolve(data);
        });
    }catch (e){
      console.log(e);
      reject(e);
    }
  })

}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data1 = await readCSV(1, path.join(__dirname, '/../rawData/ADTEST1.csv'), Sequelize)
    const data2 = await readCSV(2, path.join(__dirname, '/../rawData/ADTEST2.csv'), Sequelize)
    await queryInterface.bulkInsert('tracks', [...data1, ...data2]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('tracks', null, {});
  }
};
