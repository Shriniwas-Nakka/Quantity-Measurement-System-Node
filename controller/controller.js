const service = require('../service/service');

class Controller {
    unitMeasurementController(req, res) {
        // req.checkBody('unit', "Unit should not be empty").notEmpty();
        // req.checkBody('value', "Value should not be empty").notEmpty();
        // req.checkBody('unitType1', "Unit Type 1 should not be empty").notEmpty();
        // req.checkBody('unitType2', "Unit Type 2 should not be empty").notEmpty();

        let unitDetails = {
            unit: req.body.unit,
            value: req.body.value,
            unitType1: req.body.unitType1,
            unitType2: req.body.unitType2,
        };
        let response = {};
        service.unitConversionService(unitDetails, (err, data) => {
            if (err) {
                response.success = false;
                response.error = err;
                return res.status(400).send(response);
            } else {
                response.success = true;
                response.result = data;
                return res.status(200).send(response);
            }
        })
    }
}

module.exports = new Controller();