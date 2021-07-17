'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class vehicle extends Model {
    static associate(models) {
      // define association here
    }
  };
  vehicle.init({
    licence: DataTypes.STRING,
    model: DataTypes.STRING,
    engine: DataTypes.STRING,
    chasis: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'vehicle',
  });
  return vehicle;
};