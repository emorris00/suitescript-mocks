const { assignConstructor } = require("../../helpers.cjs");

@assignConstructor()
class ResultSet {
	columns;
	results;
	types;

	asMappedResults = () => {};

	iterator = () => {};
}

module.exports = ResultSet;
