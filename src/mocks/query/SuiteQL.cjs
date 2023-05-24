const { assignConstructor } = require("../../helpers.cjs");

@assignConstructor()
class SuiteQL {
	columns;
	params;
	query;
	type;

	run = () => {};

	runPaged = () => {};
}

module.exports = SuiteQL;
