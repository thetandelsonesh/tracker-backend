const { QueryTypes } = require('sequelize');
const Joi = require('joi');

const { sequelize } = require('../../db/models');
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

    const selectQuery = `
        SELECT ST_MakeLine(tracks."location") as polyline, tracks."vehicleId" 
        FROM tracks
        WHERE tracks."vehicleId" = ${vehicleId}
        AND tracks."trackedAt" BETWEEN '${new Date(startDate*1000).toISOString()}' AND '${new Date(endDate*1000).toISOString()}'
        GROUP BY tracks."vehicleId"
    `;

    const results = await sequelize.query(selectQuery, { type: QueryTypes.SELECT });

    if(results.length === 0){
      res.send(NO_DATA_FOUND);
      return;
    }
    res.send({
      payload: {
        polyline: JSON.stringify(results)
      },
      msg: "Vehicle Activity List"
    });
  }catch (e){
    res.send(ERROR_500);
  }
}

module.exports = vehicleActivity;
