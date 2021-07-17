'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class track extends Model {
    static associate(models) {
      // define association here
      track.belongsTo(models.vehicle);
    }
  };
  track.init({
    vehicleId: DataTypes.STRING,
    trackedAt: DataTypes.DATE,
    location: DataTypes.GEOMETRY('POINT')
  }, {
    sequelize,
    modelName: 'track',
    underscored: false,
  });
  return track;
};