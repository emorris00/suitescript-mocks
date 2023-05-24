const { assignConstructor } = require("../../helpers.cjs");

@assignConstructor()
class Result {
	values;

	asMap = () => {};
}

module.exports = Result;
