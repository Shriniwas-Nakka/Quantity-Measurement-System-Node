module.exports = {
	"metre": { system: "si" , measures: "length", "unit": "m", magnitude: true, base: 10 },

	"gram": { system: "si" , measures: "mass", "unit": "g", magnitude: true, base: 10 },

	"second": { system: "si" , measures: "time", "unit": "s", magnitude: true, base: 10 },

	//Refs for second in SI
	"minute": { "ref": "second", "unit": "m",
		"operations":
		{
			"to": function(val) { return val * 60; },
			"from": function(val) { return val / 60; }
		}
	},

	"hour": { "ref": "second", "unit": "h",
		"operations": {
			"to":	function(val) { return val * 3600; },
		 	"from": function(val) { return val / 3600; },
		}
	},

	"day": { "ref": "second", "unit": "d", "operations": {
			"to":	function(val) { return val * 86400; },
			"from": function(val) { return val / 86400; },
		}
	},

	"year": { "ref": "second", "unit": "d",
		"operations": {
			"to":	function(val) { return val * 31556926; },
			"from": function(val) { return val / 31556926; },
		}
	},

	"ampere": { system: "si" , measures: "current", "unit": "A", magnitude: true, base: 10 },
	"kelvin": { system: "si" , measures: "temperature", "unit": "K",  magnitude: true, base: 10 },

	"mole": { system: "si", measures: "substance", "unit": "mol", magnitude: true, base: 10 },
	"candela": { system: "si", measures: "light", "unit": "cd", magnitude: true, base: 10 },



	"celsius": { system: "celsius" , measures: "temperature", "unit": "C",
		"operations": {
			"to": function(val) { return val + 273.15 },
			"from": function(val) { return val - 273.15 }
		}
	},

	"fahrenheit": { system: "fahrenheit", measures: "temperature", "unit": "F",
		"operations": {
			"to": function(val) { return (val + 459.67) * (5/9); },
			"from": function(val) { return (val * (9/5)) - 459.67; }
			}
	},

	"rankine": { system: "rankine", measures: "temperature", "unit": "R",
		"operations": {
				"to": function(val) { return val * (5/9)},
				"from": function(val) { return val * (9/5)}
		}
	}
};
