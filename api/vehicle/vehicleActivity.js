const { Op } = require('sequelize');
const Joi = require('joi');

const { track } = require('../../db/models');
const { ERROR_500, NO_DATA_FOUND, INVALID_DATA } = require('../../constants/errorCodes')

const schema = Joi.object({
  vehicleId: Joi.number().integer().min(1).required(),
  startDate: Joi.date().timestamp('unix').required(),
  endDate: Joi.date().timestamp('unix').required(),
});

const vehicleActivity = async (req, res) => {
  const {startDate, endDate, vehicleId} = req.query;

  try {
    await schema.validateAsync({startDate, endDate, vehicleId});
  } catch (e) {
    res.send(INVALID_DATA);
    return;
  }

  try{
    const list = await track.findAll({
      where: {
        vehicleId: vehicleId,
        trackedAt: {
          [Op.between]: [new Date(startDate*1000), new Date(endDate*1000)]
        }
      },
      order: [['trackedAt', 'ASC']]
    });

    if(list.length === 0){
      res.send(NO_DATA_FOUND);
      return;
    }

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