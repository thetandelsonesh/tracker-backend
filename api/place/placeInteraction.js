const { Op, fn, col } = require('sequelize');
const Joi = require('joi');

const { vehicle, track, place } = require('../../db/models');
const { ERROR_500, INVALID_DATA, NO_DATA_FOUND } = require('../../constants/errorCodes')

const limit = 50;

const schema = Joi.object({
  placeId: Joi.number().integer().min(1).required(),
  startDate: Joi.date().timestamp('unix').required(),
  endDate: Joi.date().timestamp('unix').required(),
  page: Joi.number().integer().min(1).required(),
});

const placeInteraction = async (req, res) => {
  const {placeId, startDate, endDate, page = 1} = req.query;

  try {
    await schema.validateAsync({placeId, startDate, endDate, page});
  } catch (e) {
    res.send(INVALID_DATA);
    return;
  }

  const offset = ((page - 1) * limit);

  try{

    const placeData = await place.findOne({
      where: {
        id: placeId
      }
    });

    if(!placeData){
      res.send(INVALID_DATA);
      return;
    }

    const data = await track.findAndCountAll({
      where: {
        trackedAt: {
          [Op.between]: [new Date(startDate*1000), new Date(endDate*1000)]
        }
      },
      include: [{model: vehicle}],
      limit: limit,
      offset: offset,
      order: [['trackedAt', 'ASC']]
    });

    if(data.count === 0){
      res.send(NO_DATA_FOUND);
      return;
    }

    res.send({
      payload: {
        list: data.rows,
        total: data.count,
      },
      msg: "Place Interaction List"
    });
  }catch (e){
    res.send(ERROR_500);
  }
}

module.exports = placeInteraction;