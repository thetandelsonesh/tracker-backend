'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class track extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  track.init({
    vehicle_id: DataTypes.STRING,
    location: DataTypes.GEOMETRY('POINT', 4326)
  }, {
    sequelize,
    modelName: 'track',
  });
  return track;
};