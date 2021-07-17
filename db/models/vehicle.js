'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class vehicle extends Model {
    static associate(models) {
      // define association here
      vehicle.hasMany(models.track);
    }
  };
  vehicle.init({
    license: DataTypes.STRING,
    model: DataTypes.STRING,
    engine: DataTypes.STRING,
    chassis: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'vehicle',
    underscored: false,
  });
  return vehicle;
};