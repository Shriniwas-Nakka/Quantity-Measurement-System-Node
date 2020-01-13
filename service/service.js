const units = require('./units.json');
const unitTypes = require('./unitTypes.json');

class Service {
    unitConverter(unit, unitType) {

        const unitTypes = [{
            Length: [{"type": "FOOT", "value": 12.0},
                {"type": "INCH", "value": 1.0},
                {"type": "CENTIMETER", "value": 0.4},
                {"type": "YARD", "value": 36.0}],
            Volume: [
                {"type": "GALLON", "value": 3.78},
                {"type": "LITRES", "value": 1},
                {"type": "MILLILITERS", "value": 0.001}],
            Weight: [
                {"type": "KILOGRAMS", "value": 1000},
                {"type": "GRAMS", "value": 1},
                {"type": "TONNES", "value": 1000000}],
            Temperature: [
                {"type": "FAHRENHEIT", "value": 32.0},
                {"type": "CELSIUS", "value": 1.0}]
        }];

        let unitValue = unitTypes.map(data => {
            if (unit === units.LENGTH) {
                return data.Length.filter(result => {
                    if (result.type == unitType) {
                        return result.value;
                    }
                })
            }
        });
        return unitValue[0][0].value;

        // if (unit == units.LENGTH) {
        //     let result = unitTypes.filter(data => {
        //         if (data.type === unitType) {
        //             return data.value;
        //         }
        //     });
        //     return result[0].value;
        // }
    }

    unitConversionService(req, callback) {
        let result = (req.value * this.unitConverter(req.unit, req.unitType1)) / this.unitConverter(req.unit, req.unitType2);
        console.log(result);
        return callback(null, {message: "Conversion Successful!", value: result})
    }
}

module.exports = new Service();