const { Op } = require('sequelize');
const { vehicle, track } = require('../../db/models');
const { ERROR_500 } = require('../../constants/errorCodes')

const limit = 50;

const placeInteraction = async (req, res) => {
  try{
    const {placeId, startDate, endDate, page = 1} = req.query;

    const offset = ((page - 1) * limit);

    const data = await track.findAndCountAll({
      where: {
        trackedAt: {
          [Op.between]: [new Date(startDate), new Date(endDate).setHours(23,59,59,999)]
        }
      },
      include: [{model: vehicle}],
      limit: limit,
      offset: offset,
      order: [['trackedAt', 'ASC']]
    });

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