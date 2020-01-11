var mapping = require('./mapping.js');
var magnitudes = require('./magnitudes.js');
var dimensions = require('./dimensions.js');

module.exports = function(value) {
	var convert = {
		value: value,				//The value to be converted

		_from: null, 				//The unit to be converted from
		_to: null, 					//The unit to be converted to

		getRef: function(unit) {
			return mapping[unit.ref];
		},

		checkMeasureCompatibility: function() {
			var fromUnit = mapping[this._from];
			var toUnit = mapping[this._to];

			if(typeof fromUnit.ref !== 'undefined') {
				fromUnit = this.getRef(fromUnit);
			}

			if(typeof toUnit.ref !== 'undefined') {
				toUnit = this.getRef(toUnit);
			}


			if(fromUnit.measures != toUnit.measures) {
				throw new Error('Cannot convert '+mapping[this._from].measures+' to '+mapping[this._to].measures);
				return false;
			}

			return true;
		},

		setUpOperations: function() {
			var _this = this;

			if(mapping[this._from].value) {
				mapping[this._from].operations = {
					to: function(val) { return val * mapping[_this._from].value; },
					from: function(val) { return val / mapping[_this._from].value; },
				}
			}

			if(mapping[this._to].value) {
				mapping[this._to].operations = {
					to: function(val) { return val * mapping[_this._to].value; },
					from: function(val) { return val / mapping[_this._to].value; },
				}
			}

			if(!mapping[this._from].operations) {
				mapping[this._from].operations = {
					to: function(val) { return val; },
					from: function(val) { return val; }
				}
			}

			if(!mapping[this._to].operations) {
				mapping[this._to].operations = {
					to: function(val) { return val; },
					from: function(val) { return val; }
				}
			}


		},

		//Do the actual conversion;
		convert: function() {

			var magnitudeMultiplier = 1;

			var defaultMagnitudes = {
				from: { symbol: "", factor: 0},
				to: { symbol: "", factor: 0}
			};

			var multipliers = {
				from: 1,
				to: 1
			};

			var values = {
				from: this.value,
				to: 1
			};

			for(var i in magnitudes) {
				if(this._from.indexOf(i) != -1) {

					defaultMagnitudes.from = magnitudes[i];
					this._from = this._from.replace(i, '').trim();

					multipliers.from = Math.pow(mapping[this._from].base, defaultMagnitudes.from.factor);
				}

				if(this._to.indexOf(i) != -1) {
					defaultMagnitudes.to = magnitudes[i];
					this._to = this._to.replace(i, '').trim();

					multipliers.to = Math.pow(mapping[this._to].base, defaultMagnitudes.to.factor);
				}
			}

			this.checkMeasureCompatibility();

			this.setUpOperations();

			values.from = mapping[this._from].operations.to(values.from);

			var converted = mapping[this._to].operations.from(values.from) * (multipliers.from / multipliers.to);

			return Math.round(converted * Math.pow(10, 10)) / Math.pow(10, 10);
		},

		//Set unit to be converted from
		from: function(unit) {
			this._from= unit;

			if(this._to != null) {
				return this.convert();
			}

			return this;
		},

		//Set unit to be converted to
		to: function(unit) {
			this._to = unit;

			if(this._from != null) {

				return this.convert();
			}

			return this;
		}


	}

	return convert;
}
