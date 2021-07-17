const apiKey = require('../constants/apiKey');
const {NO_X_API_TOKEN} = require('../constants/errorCodes');

const authenticate = (req, res, next) => {
  apiKey === req.header('x-api-key') ? next() : res.status(401).send(NO_X_API_TOKEN)
};

module.exports = authenticate;