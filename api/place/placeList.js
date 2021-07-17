const { place } = require('../../db/models');
const { ERROR_500 } = require('../../constants/errorCodes')

const placeList = async (req, res) => {
  try{
    const list = await place.findAll({
      attributes: {
        include: ['id', 'name']
      }
    });
    res.send({
      payload: {
        list: list
      },
      msg: "Places List"
    });
  }catch (e){
    res.send(ERROR_500);
  }
}

module.exports = placeList;