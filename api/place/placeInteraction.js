const { Op, fn, col } = require('sequelize');
const { vehicle, track, place } = require('../../db/models');
const { ERROR_500, INVALID_DATA } = require('../../constants/errorCodes')

const limit = 50;

const placeInteraction = async (req, res) => {
  try{
    const {placeId, startDate, endDate, page = 1} = req.query;

    const offset = ((page - 1) * limit);

    const placeData = await place.findOne({
      where: {
        id: placeId
      }
    });

    if(!placeData){
      res.send(INVALID_DATA);
      return;
    }

    const contains = fn('ST_CONTAINS',
      placeData.border,
      col('location')
    );
    console.log(contains);

    const data = await track.findAll({
      where: contains,
      // where: {
      //   location: []
      //   trackedAt: {
      //     [Op.between]: [new Date(startDate), new Date(endDate).setHours(23,59,59,999)]
      //   }
      // },
      // include: [{model: vehicle}],
      // limit: limit,
      // offset: offset,
      // order: [['trackedAt', 'ASC']]
    });

    res.send({
      payload: {
        list: data.rows,
        total: data.count,
      },
      msg: "Place Interaction List"
    });
  }catch (e){
    res.send(e);
  }
}

module.exports = placeInteraction;