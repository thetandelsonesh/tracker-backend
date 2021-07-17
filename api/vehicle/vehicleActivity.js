const { Op } = require('sequelize');
const { track } = require('../../db/models');
const { ERROR_500 } = require('../../constants/errorCodes')

const vehicleActivity = async (req, res) => {
  try{
    const {startDate, endDate, vehicleId,} = req.query;

    const list = await track.findAll({
      where: {
        vehicleId: vehicleId,
        trackedAt: {
          [Op.between]: [new Date(startDate), new Date(endDate).setHours(23,59,59,999)]
        }
      },
      order: [['trackedAt', 'ASC']]
    });

    res.send({
      payload: {
        list: list
      },
      msg: "Vehicle Activity List"
    });
  }catch (e){
    res.send(ERROR_500);
  }
}

module.exports = vehicleActivity;