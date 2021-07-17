const express = require('express');

const placeInteraction = require('./placeInteraction');
const placeList = require('./placeList');

const router = express.Router();

router.get('/', placeList);
router.get('/interaction', placeInteraction);

module.exports = router;