const { assignConstructor } = require("../../helpers.cjs");

@assignConstructor()
class Period {
	adjustment;
	code;
	type;
}

module.exports = Period;
