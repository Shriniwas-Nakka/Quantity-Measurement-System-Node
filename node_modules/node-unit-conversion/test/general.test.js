var convert = require('../lib/convert.js');

module.exports = {
	'si-length' : function(test) {

		test.equal(convert(100).from('metre').to('centimetre'), 10000);
		test.equal(convert(20).from('decimetre').to('metre'), 2);
		test.notEqual(convert(50).from('millimetre').to('decametre'), 1021);
		test.done();
	},

	'si-mass' : function(test) {
		test.equal(convert(100).from('gram').to('centigram'), 10000);
		test.equal(convert(20).from('decigram').to('gram'), 2);
		test.notEqual(convert(50).from('milligram').to('decagram'), 1021);
		test.done();
	},

	'si-time': function(test) {
		test.equal(convert(100).from('second').to('centisecond'), 10000);
		test.equal(convert(20).from('decisecond').to('second'), 2);
		test.notEqual(convert(50).from('millisecond').to('decasecond'), 1021);

		test.equal(convert(60).from('minute').to('hour'), 1);
		test.equal(convert(2).from('hour').to('second'), 7200);

		test.equal(convert(1).from('day').to('year'), 0.0027379093 );
		test.equal(convert(365).from('day').to('year'), 0.9993368809);

		test.done();
	},

	'si-current' : function(test) {
		test.equal(convert(100).from('ampere').to('centiampere'), 10000);
		test.equal(convert(20).from('deciampere').to('ampere'), 2);
		test.notEqual(convert(50).from('milliampere').to('decaampere'), 1021);
		test.done();
	},

	'si-light' : function(test) {
		test.equal(convert(100).from('candela').to('centicandela'), 10000);
		test.equal(convert(20).from('decicandela').to('candela'), 2);
		test.notEqual(convert(50).from('millicandela').to('decacandela'), 1021);
		test.done();
	},

	'temperatures' : function(test) {
		test.equal(convert(39).from('celsius').to('fahrenheit'), 102.2);
		test.equal(convert(150).from('fahrenheit').to('kelvin'), 338.7055555556);
		test.equal(convert(40).from('rankine').to('celsius'), -250.9277777778);

		test.done();
	},

	'uk-imp-lengths': function(test) {
		test.equal(convert(10).from('uk inch').to('uk foot'), 0.8333333333);
		test.done();
	},

	'uk-imp-mass': function(test) {
		test.equal(convert(10).from('uk grain').to('uk pound'), 0.0014285714);
		test.done();
	},

	'us-cust-lengths': function(test) {
		test.equal(convert(10).from('us foot').to('us inch'), 120);
		test.done();
	},

	'us-cust-mass': function(test) {
		test.equal(convert(10).from('us grain').to('us pound'), 0.0014285714 );
		test.done();
	},

	'inter-scale-lengths': function(test) {
		test.equal(convert(10).from('uk inch').to('metre'), 0.254);
		test.equal(convert(10).from('us inch').to('metre'), 0.254);
		test.done();
	},

	'incompatible-types': function(test) {
		test.throws(
			function() {
				convert(10).from('uk inch').to('second');
			},
			Error,
			'Cannot convert from length to time'
		);

		test.done();
	}
}
