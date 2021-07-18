const { QueryTypes } = require('sequelize');
const Joi = require('joi');

const { sequelize } = require('../../db/models');
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

    const stWithin = `ST_Within(tracks."location", (select places."border" from places where places."id" = ${placeId}))`;


    const selectQueryCount = `
        SELECT count('*')
        FROM tracks
        WHERE tracks."trackedAt" BETWEEN '${new Date(startDate*1000).toISOString()}' AND '${new Date(endDate*1000).toISOString()}'
        AND ${stWithin} = true
    `;

    const countResult = await sequelize.query(selectQueryCount, { type: QueryTypes.SELECT });

    const { count } = countResult[0];

    const selectQuery = `
        SELECT tracks."id", tracks."vehicleId", v."license",  v."model", tracks."location", tracks."trackedAt"
        FROM tracks
        LEFT JOIN vehicles as v ON (v."id" = tracks."vehicleId")
        WHERE tracks."trackedAt" BETWEEN '${new Date(startDate*1000).toISOString()}' AND '${new Date(endDate*1000).toISOString()}'
        AND ${stWithin} = true
        LIMIT ${limit}
        OFFSET ${offset}
    `;

    const results = await sequelize.query(selectQuery, { type: QueryTypes.SELECT });

    if(results.length === 0){
      res.send(NO_DATA_FOUND);
      return;
    }

    res.send({
      payload: {
        list: results,
        total: count,
      },
      msg: "Place Interaction List"
    });
  }catch (e){
    res.send(ERROR_500);
  }
}

module.exports = placeInteraction;