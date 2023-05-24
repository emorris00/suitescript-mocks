const { assignConstructor } = require("../../helpers.cjs");

@assignConstructor()
class Sort {
	ascending;
	caseSensitive;
	column;
	locale;
	nullsLast;
}

module.exports = Sort;
