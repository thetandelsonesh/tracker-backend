const { vehicle } = require('../../db/models');
const { ERROR_500 } = require('../../constants/errorCodes')

const vehicleList = async (req, res) => {
  try{
    const list = await vehicle.findAll();
    res.send({
      payload: {
        list: list
      },
      msg: "Vehicle List"
    });
  }catch (e){
    res.send(ERROR_500);
  }
}

module.exports = vehicleList;