const express = require('express');
const router = express.Router();
const controller = require('../controller/controller');

router.get('/length', controller.unitMeasurementController);

module.exports = router;
