var requireDir = require("require-dir");
var merge = require('merge');
var mappings = requireDir('./mappings', { recurse: true });

mappingStructure = {};

for(var i in mappings) {
	mappingStructure = merge(mappingStructure, mappings[i]);
}

module.exports = mappingStructure;
