const { assignConstructor } = require("../../helpers.cjs");

@assignConstructor()
class Column {
	aggregate;
	alias;
	component;
	context;
	fieldId;
	formula;
	groupBy;
	label;
	type;
}

module.exports = Column;
