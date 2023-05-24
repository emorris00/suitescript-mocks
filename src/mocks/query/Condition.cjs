const { assignConstructor } = require("../../helpers.cjs");

@assignConstructor()
class Condition {
	aggregate;
	children;
	component;
	fieldId;
	formula;
	operator;
	type;
	values;
}

module.exports = Condition;
