const express = require('express');

const place = require('./place');
const vehicle = require('./vehicle');

const router = express.Router();

router.use('/place', place);
router.use('/vehicle', vehicle);

module.exports = router;