const express = require('express');

const vehicleList = require('./vehicleList');
const vehicleActivity = require('./vehicleActivity');

const router = express.Router();

router.get('/', vehicleList);
router.get('/activity', vehicleActivity);

module.exports = router;