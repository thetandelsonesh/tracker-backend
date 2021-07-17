const express = require('express');

const interaction = require('./placeInteraction');

const router = express.Router();

router.get('/interaction', interaction);

module.exports = router;